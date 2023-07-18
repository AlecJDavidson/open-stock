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
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { SEARCH_PARTS } from '../../graphql/queries/partQueries'
import { Part } from '../../types/Part'

const PartsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParts, { loading, data }] = useLazyQuery<{ partsBy: Part[] }>(
    SEARCH_PARTS,
  )

  useEffect(() => {
    // Trigger the search query whenever the searchQuery state changes
    searchParts({ variables: { search: searchQuery } })
  }, [searchQuery, searchParts])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Center>
      <Box border="1px solid #ccc" p={4} borderRadius="md">
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
                  <Td>{part.quantity}</Td>
                  <Td>{part.tags.join(', ')}</Td>
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

