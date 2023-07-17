import React, { useState } from 'react'
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

import { SEARCH_PARTS } from '../../graphql/queries/partQueries' // Replace with your GraphQL query and types
import { Part } from '../../types/Part'

const PartsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParts, { loading, data }] = useLazyQuery<{ partsBy: Part[] }>(
    SEARCH_PARTS,
  )

  const handleSearch = () => {
    searchParts({ variables: { search: searchQuery } })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Center>
      <Box maxW='600px' w='100%' p={4}>
        <InputGroup mt={4}>
          <Input
            placeholder='Search for parts...'
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement>
            <SearchIcon
              color='gray.300'
              cursor='pointer'
              onClick={handleSearch}
            />
          </InputRightElement>
        </InputGroup>
        <Table variant='striped' size='md' mt={4}>
          <Thead>
            <Tr>
              <Th>Part Name</Th>
              <Th>Manufacturer</Th>
              <Th>Bin</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={3}>Loading...</Td>
              </Tr>
            ) : (
              data?.partsBy.map((part) => (
                <Tr key={part.id}>
                  <Td>{part.name}</Td>
                  <Td>{part.brand}</Td>
                  <Td>{part.bin}</Td>
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
