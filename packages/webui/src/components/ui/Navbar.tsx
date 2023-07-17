import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/react'

const Navbar: React.FC = () => {
  return (
    <Box>
      <Flex
        as='nav'
        align='center'
        justify='space-between'
        py={4}
        px={8}
        bg='gray.800'
        color='white'
      >
        <Link href='/' _hover={{ textDecoration: 'none' }}>
          <Text fontSize='xl' fontWeight='bold'>
            Logo
          </Text>
        </Link>
        <Flex>
          <Link href='/' mr={4} _hover={{ textDecoration: 'underline' }}>
            Link 1
          </Link>
          <Link href='/' mr={4} _hover={{ textDecoration: 'underline' }}>
            Link 2
          </Link>
          <Link href='/' _hover={{ textDecoration: 'underline' }}>
            Link 3
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
