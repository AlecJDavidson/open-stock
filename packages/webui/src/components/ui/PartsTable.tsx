import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Part } from '../../types/Part'

interface Props {
  parts: Part[]
}

const PartsTable: React.FC<Props> = ({ parts }) => {
  return (
    <Table variant='striped' colorScheme='gray'>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Brand</Th>
          <Th>Name</Th>
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
        {parts.map((part) => (
          <Tr key={part.id}>
            <Td>{part.id}</Td>
            <Td>{part.brand}</Td>
            <Td>{part.name}</Td>
            <Td>{part.model}</Td>
            <Td>{part.description}</Td>
            <Td>{part.bin}</Td>
            <Td>{part.container}</Td>
            <Td>{part.location}</Td>
            <Td>{part.quantity}</Td>
            <Td>{part.tags.join(', ')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default PartsTable
