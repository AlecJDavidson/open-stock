import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react';
import { Part } from '../../../types/Part';

interface EditPartFormProps {
  part: Part;
  onSubmit: (updatedPart: Part) => void;
  onCancel: () => void;
}

const EditPartForm: React.FC<EditPartFormProps> = ({
  part,
  onSubmit,
  onCancel,
}) => {
  const [editedPart, setEditedPart] = useState<Part>(part);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPart((prevPart) => ({ ...prevPart, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(editedPart);
  };

  return (
    <Box>
      <FormControl id='brand'>
        <FormLabel>Brand</FormLabel>
        <Input name='brand' value={editedPart.brand} onChange={handleChange} />
      </FormControl>
      <FormControl id='name'>
        <FormLabel>Name</FormLabel>
        <Input name='name' value={editedPart.name} onChange={handleChange} />
      </FormControl>
      {/* Add other properties you want to edit */}
      <Stack direction='row' mt={4}>
        <Button colorScheme='blue' onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button colorScheme='gray' onClick={onCancel}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default EditPartForm;
