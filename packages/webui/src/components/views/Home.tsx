import React from 'react'
import { Flex, HStack, VStack } from '@chakra-ui/react'
import AddPartForm from '../ui/forms/AddPart'
import PartsSearch from '../ui/PartSearch'

const Home: React.FC = () => {
  return (
    <Flex direction='column' mt={8}>
      <HStack mt={4} alignItems='flex-start'>
        <Flex alignItems='stretch'>
          <VStack>
            <AddPartForm />
          </VStack>
        </Flex>
        <VStack>
          <PartsSearch />
        </VStack>
      </HStack>
      <Flex alignItems='center' mt={4} ml={4}></Flex>
    </Flex>
  )
}

export default Home
