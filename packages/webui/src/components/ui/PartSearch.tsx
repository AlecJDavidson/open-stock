import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
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
  Stack,
  VStack,
} from '@chakra-ui/react'
import { SearchIcon, AddIcon, MinusIcon, CloseIcon } from '@chakra-ui/icons'

import { SEARCH_PARTS } from '../../graphql/queries/partQueries'
import {
  UPDATE_PART_MUTATION,
  DELETE_PART_MUTATION,
} from '../../graphql/mutations/partMutations'
import { Part } from '../../types/Part'

const PartsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { loading, data, refetch } = useQuery<{ partsBy: Part[] }>(
    SEARCH_PARTS,
    {
      variables: { search: searchQuery },
    },
  )
  const [updatePartMutation] = useMutation(UPDATE_PART_MUTATION)
  const [deletePartMutation] = useMutation(DELETE_PART_MUTATION)

  useEffect(() => {
    // Trigger the search query whenever the searchQuery state changes
    // Note: You can also debounce the search to avoid excessive requests.
    refetch({ search: searchQuery })
  }, [searchQuery, refetch])

  // Step 1: Add state for sorting
  const [sorting, setSorting] = useState<{
    column: string
    direction: 'asc' | 'desc'
  }>({
    column: 'name', // Default sorting column
    direction: 'asc', // Default sorting direction
  })

  // Step 2: Function to handle sorting
  const handleSort = (column: string) => {
    setSorting((prevSorting) => ({
      column,
      direction:
        prevSorting.column === column && prevSorting.direction === 'asc'
          ? 'desc'
          : 'asc',
    }))
  }

  // Step 3: Apply sorting to the table data
  const sortedData = data?.partsBy.slice().sort((a: any, b: any) => {
    if (sorting.direction === 'asc') {
      return a[sorting.column].localeCompare(b[sorting.column])
    } else {
      return b[sorting.column].localeCompare(a[sorting.column])
    }
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleIncreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      const updatedQuantity = currentQuantity + 1
      await updatePartMutation({
        variables: {
          updatePartId: partId,
          quantity: updatedQuantity,
        },
        update(cache, { data: { updatePart } }) {
          const { partsBy } = cache.readQuery<{ partsBy: Part[] }>({
            query: SEARCH_PARTS,
            variables: { search: searchQuery },
          }) || { partsBy: [] }

          const updatedPartsBy = partsBy.map((part) =>
            part.id === updatePart.id
              ? { ...part, quantity: updatePart.quantity }
              : part,
          )

          cache.writeQuery({
            query: SEARCH_PARTS,
            variables: { search: searchQuery },
            data: { partsBy: updatedPartsBy },
          })
        },
      })
    } catch (error) {
      console.error('Error while updating the quantity')
    }
  }

  const handleDecreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      if (currentQuantity > 0) {
        const updatedQuantity = currentQuantity - 1
        await updatePartMutation({
          variables: {
            updatePartId: partId,
            quantity: updatedQuantity,
          },
          update(cache, { data: { updatePart } }) {
            const { partsBy } = cache.readQuery<{ partsBy: Part[] }>({
              query: SEARCH_PARTS,
              variables: { search: searchQuery },
            }) || { partsBy: [] }

            const updatedPartsBy = partsBy.map((part) =>
              part.id === updatePart.id
                ? { ...part, quantity: updatePart.quantity }
                : part,
            )

            cache.writeQuery({
              query: SEARCH_PARTS,
              variables: { search: searchQuery },
              data: { partsBy: updatedPartsBy },
            })
          },
        })
      }
    } catch (error) {
      console.error('Error while updating the quantity')
    }
  }

  const handleDeletePart = async (partId: string) => {
    try {
      await deletePartMutation({
        variables: {
          deletePartId: partId,
        },
      })

      console.log('Deleted part:', { partId })

      // Refetch the data after the delete mutation to update the table
      refetch()
    } catch (error) {
      console.error('Error while deleting the part')
    }
  }

  return (
    <Center>
      <VStack spacing={4} maxWidth='97%' align='stretch'>
        <InputGroup>
          <Input
            placeholder='Search for parts...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <InputRightElement>
            <SearchIcon color='gray.300' cursor='pointer' />
          </InputRightElement>
        </InputGroup>
        <Box
          border='1px solid #ccc'
          p={4}
          borderRadius='md'
          w='100%'
          overflowY='auto'
          h='53.1rem'
        >
          <Table variant='striped' size='md'>
            <Thead>
              <Tr>
                {/* Step 3: Add onClick handlers for sorting */}
                <Th onClick={() => handleSort('name')}>Name</Th>
                <Th onClick={() => handleSort('brand')}>Brand</Th>
                <Th onClick={() => handleSort('model')}>Model</Th>
                <Th onClick={() => handleSort('description')}>Description</Th>
                <Th onClick={() => handleSort('bin')}>Bin</Th>
                <Th onClick={() => handleSort('container')}>Container</Th>
                <Th onClick={() => handleSort('location')}>Location</Th>
                <Th onClick={() => handleSort('quantity')}>Quantity</Th>
                <Th onClick={() => handleSort('tags')}>Tags</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Step 3: Use sortedData instead of data?.partsBy */}
              {loading ? (
                <Tr>
                  <Td colSpan={10}>Loading...</Td>
                </Tr>
              ) : (
                sortedData?.map((part) => (
                  <Tr key={part.id}>
                    <Td>{part.name}</Td>
                    <Td>{part.brand}</Td>
                    <Td>{part.model}</Td>
                    <Td>{part.description}</Td>
                    <Td>{part.bin}</Td>
                    <Td>{part.container}</Td>
                    <Td>{part.location}</Td>
                    <Td>
                      <Stack direction='row' spacing={2} alignItems='center'>
                        <IconButton
                          size='sm'
                          aria-label='Decrease Quantity'
                          icon={<MinusIcon />}
                          onClick={() =>
                            handleDecreaseQuantity(part.id, part.quantity)
                          }
                        />
                        <Box>
                          {part.quantity > 10
                            ? part.quantity
                            : part.quantity.toString().padStart(2, '0')}
                        </Box>
                        <IconButton
                          size='sm'
                          aria-label='Increase Quantity'
                          icon={<AddIcon />}
                          onClick={() =>
                            handleIncreaseQuantity(part.id, part.quantity)
                          }
                        />
                      </Stack>
                    </Td>
                    <Td>{part.tags.join(', ')}</Td>
                    <Td>
                      <IconButton
                        size='sm'
                        aria-label='Delete Part'
                        icon={<CloseIcon />}
                        onClick={() => handleDeletePart(part.id)}
                        _hover={{
                          backgroundColor: 'red.500',
                        }}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Center>
  )
}

export default PartsSearch
