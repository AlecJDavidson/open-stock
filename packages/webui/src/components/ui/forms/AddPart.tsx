import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PART_MUTATION } from '../../../graphql/mutations/partMutations'
import './AddPartForm.css' // Import the CSS file for styling

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
  const [createPart, { loading, error }] = useMutation(CREATE_PART_MUTATION)
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <form onSubmit={handleSubmit} className='part-form'>
      <label>
        Bin:
        <input
          type='text'
          name='bin'
          value={formData.bin}
          onChange={handleChange}
          required
        />
      </label>
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
      <label>
        Quantity:
        <input
          type='number'
          name='quantity'
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tags (comma-separated):
        <input
          type='text'
          name='tags'
          value={formData.tags.join(',')}
          onChange={handleTagsChange}
          required
        />
      </label>
      <div className='buttons-container'>
        <button type='submit' className='add-button'>
          Add Part
        </button>
        <button type='button' className='cancel-button' onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddPartForm
