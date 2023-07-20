import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PART_MUTATION } from '../../../graphql/mutations/partMutations'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'

interface PartData {
  bin: string
  brand: string
  container: string
  description: string
  location: string
  model: string
  name: string
  quantity: number
  tags: string[]
}

const AddPartForm: React.FC = () => {
  const initialFormData: PartData = {
    bin: '',
    brand: '',
    container: '',
    description: '',
    location: '',
    model: '',
    name: '',
    quantity: 0,
    tags: [],
  }

  const [formData, setFormData] = useState<PartData>(initialFormData)
  const [createPart] = useMutation(CREATE_PART_MUTATION)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    // Convert the quantity field to a number, or set it to 0 if the input is not a valid number
    const parsedValue = name === 'quantity' ? parseFloat(value) || 0 : value

    setFormData({
      ...formData,
      [name]: parsedValue,
    })
  }

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const tagsArray = value.split(',').map((tag) => tag.trim())
    setFormData({
      ...formData,
      tags: tagsArray,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPart({
      variables: formData,
    })
      .then((response) => {
        console.log('Part added successfully:', response.data.createPart)
        setFormData(initialFormData) // Reset the form after successful submission
      })
      .catch((error) => {
        console.error('Error adding part:', error)
      })
  }

  const handleCancel = () => {
    setFormData(initialFormData) // Reset the form on cancel
  }

  return (
    <Center>
      <Box border='1px solid #ccc' p={4} borderRadius='md' maxWidth={'95%'}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align='stretch'>
            <FormControl isRequired>
              <FormLabel>Bin:</FormLabel>
              <Input
                type='text'
                name='bin'
                value={formData.bin}
                onChange={handleChange}
              />
            </FormControl>

            <label>
              Brand:
              <input
                type='text'
                name='brand'
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Container:
              <input
                type='text'
                name='container'
                value={formData.container}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Location:
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Model:
              <input
                type='text'
                name='model'
                value={formData.model}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <FormControl isRequired>
              <FormLabel>Quantity:</FormLabel>
              <Input
                type='number'
                name='quantity'
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Tags (comma-separated):</FormLabel>
              <Input
                type='text'
                name='tags'
                value={formData.tags.join(',')}
                onChange={handleTagsChange}
              />
              <FormErrorMessage>Tags are required.</FormErrorMessage>
            </FormControl>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
              <Button type='submit' colorScheme='blue'>
                Add Part
              </Button>
              <Button type='button' variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </VStack>
        </form>
      </Box>
    </Center>
  )
}

export default AddPartForm
