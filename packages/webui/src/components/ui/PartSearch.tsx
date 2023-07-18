import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon, MinusIcon, CloseIcon } from '@chakra-ui/icons'
import { useMutation } from '@apollo/client'

import { SEARCH_PARTS } from '../../graphql/queries/partQueries'
import {
  UPDATE_PART_MUTATION,
  DELETE_PART_MUTATION,
} from '../../graphql/mutations/partMutations'
import { Part } from '../../types/Part'

const PartsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParts, { loading, data }] = useLazyQuery<{ partsBy: Part[] }>(
    SEARCH_PARTS,
  )
  const [updatePartMutation] = useMutation(UPDATE_PART_MUTATION)

  const [deletePartMutation] = useMutation(DELETE_PART_MUTATION, {
    update(cache, { data: { deletePart } }) {
      // Get the current data from the cache
      const { partsBy } = cache.readQuery<{ partsBy: Part[] }>({
        query: SEARCH_PARTS,
        variables: { search: searchQuery },
      }) || { partsBy: [] }

      // Remove the deleted part from the cached data
      const updatedPartsBy = partsBy.filter((part) => part.id !== deletePart.id)

      // Write the updated data back to the cache
      cache.writeQuery({
        query: SEARCH_PARTS,
        variables: { search: searchQuery },
        data: { partsBy: updatedPartsBy },
      })
    },
  })

  useEffect(() => {
    // Trigger the search query whenever the searchQuery state changes
    searchParts({ variables: { search: searchQuery } })
  }, [searchQuery, searchParts])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleIncreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      // Increment the current quantity by 1
      const updatedQuantity = currentQuantity + 1

      // Perform the mutation by calling the updatePartMutation function with the variables.
      await updatePartMutation({
        variables: {
          updatePartId: partId,
          quantity: updatedQuantity,
        },
      })
    } catch (error) {
      // Handle any errors that might occur during the mutation.
      console.error('Error while updating the quantity')
    }
  }

  const handleDecreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      // Increment the current quantity by 1
      const updatedQuantity = currentQuantity - 1

      // Perform the mutation by calling the updatePartMutation function with the variables.
      await updatePartMutation({
        variables: {
          updatePartId: partId,
          quantity: updatedQuantity,
        },
      })
    } catch (error) {
      // Handle any errors that might occur during the mutation.
      console.error('Error while updating the quantity')
    }
  }

  const deletePart = async (partId: string) => {
    try {
      // Perform the mutation by calling the updatePartMutation function with the variables.
      await deletePartMutation({
        variables: {
          deletePartId: partId,
        },
      })
      console.log('deleting part: ', { partId })
    } catch (error) {
      // Handle any errors that might occur during the mutation.
      console.error('Error while deleting the part')
    }
  }

  return (
    <Center>
      <Box border='1px solid #ccc' p={4} borderRadius='md'>
        <InputGroup mt={4}>
          <Input
            placeholder='Search for parts...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <InputRightElement>
            <SearchIcon color='gray.300' cursor='pointer' />
          </InputRightElement>
        </InputGroup>
        <Table variant='striped' size='md' mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Brand</Th>
              <Th>Model</Th>
              <Th>Description</Th>
              <Th>Bin</Th>
              <Th>Container</Th>
              <Th>Location</Th>
              <Th>Quantity</Th>
              <Th>Tags</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={10}>Loading...</Td>
              </Tr>
            ) : (
              data?.partsBy.map((part) => (
                <Tr key={part.id}>
                  <Td>{part.name}</Td>
                  <Td>{part.brand}</Td>
                  <Td>{part.model}</Td>
                  <Td>{part.description}</Td>
                  <Td>{part.bin}</Td>
                  <Td>{part.container}</Td>
                  <Td>{part.location}</Td>
                  <Td>
                    <IconButton
                      size='sm'
                      aria-label='Decrease Quantity'
                      icon={<MinusIcon />}
                      onClick={() => {
                        if (part.quantity > 0) {
                          handleDecreaseQuantity(part.id, part.quantity)
                        }
                      }}
                    />
                    &nbsp; {part.quantity} &nbsp;
                    <IconButton
                      size='sm'
                      aria-label='Increase Quantity'
                      icon={<AddIcon />}
                      onClick={() =>
                        handleIncreaseQuantity(part.id, part.quantity)
                      } // Pass the current quantity to the function
                    />
                  </Td>
                  <Td>{part.tags.join(', ')}</Td>
                  <Td>
                    <IconButton
                      size='sm'
                      aria-label='Decrease Quantity'
                      icon={<CloseIcon />}
                      onClick={() => {
                        deletePart(part.id)
                      }}
                      _hover={{
                        backgroundColor: 'red.500', // Change the color on hover to red
                      }}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Center>
  )
}

export default PartsSearch
