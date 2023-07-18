import React from 'react'
import { Flex, HStack, VStack } from '@chakra-ui/react'
import AddPartForm from '../ui/forms/AddPart'
import PartsSearch from '../ui/PartSearch'

const Home: React.FC = () => {
  return (
    <Flex direction='column' mt={8}>
      <HStack mt={4} alignItems="flex-start">
        <VStack>
          <AddPartForm />
        </VStack>
        <VStack>
          <PartsSearch />
        </VStack>
      </HStack>
    </Flex>
  )
}

export default Home
