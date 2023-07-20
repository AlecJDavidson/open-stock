import React, { useState } from 'react'
import { Flex, HStack, VStack, IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import AddPartForm from '../ui/forms/AddPart'
import PartsSearch from '../ui/PartSearch'

const Home: React.FC = () => {
  const collapsed: boolean = false 
  const [showAddPartForm, setShowAddPartForm] = useState(collapsed)

  const handleToggleForm = () => {
    setShowAddPartForm((prevState) => !prevState)
  }

  return (
    <Flex direction='column' mt={8}>
      <HStack mt={4} alignItems='flex-start'>
        <Flex alignItems='stretch' flex={showAddPartForm ? 1 : 0}>
          {showAddPartForm && (
            <VStack>
              <AddPartForm />
            </VStack>
          )}
        </Flex>
        <VStack>
          <PartsSearch />
        </VStack>
      </HStack>
      <Flex alignItems='center' mt={4} ml={4}>
        <IconButton
          aria-label={showAddPartForm ? 'Collapse Form' : 'Expand Form'}
          icon={showAddPartForm ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          onClick={handleToggleForm}
        />
      </Flex>
    </Flex>
  )
}

export default Home
