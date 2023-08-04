import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { Part } from '../../../types/Part';
import { usePartListContext } from '../../../context/PartListContext';
import DeletePartButton from '../buttons/DeletePartButton';
import SearchBar from '../search/Search';
import { EditIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { UPDATE_PART_MUTATION } from '../../../graphql/mutations/partMutations';
// import { IconButton, Input } from 'chakra-ui';

const PartsTable: React.FC = () => {
  const {
    parts,
    setParts,
    deletePart,
  }: { parts: Part[]; deletePart: (partId: string) => void } =
    usePartListContext();
  const [filteredParts, setFilteredParts] = useState(parts);
  const [updatePartMutation] = useMutation(UPDATE_PART_MUTATION);

  useEffect(() => {}, [parts]);

  const handleSearch = (query: string) => {
    const filtered = parts.filter(
      (part) =>
        part.brand.toLowerCase().includes(query.toLowerCase()) ||
        part.name.toLowerCase().includes(query.toLowerCase()) ||
        part.model.toLowerCase().includes(query.toLowerCase()) ||
        part.description.toLowerCase().includes(query.toLowerCase()) ||
        part.bin.toLowerCase().includes(query.toLowerCase()) ||
        part.container.toLowerCase().includes(query.toLowerCase()) ||
        part.location.toLowerCase().includes(query.toLowerCase()) ||
        part.quantity.toString().includes(query) ||
        part.tags.join(', ').toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredParts(filtered);
  };

  const [editState, setEditState] = useState({});
  const [editedParts, setEditedParts] = useState<{ [partId: string]: Part }>(
    {},
  );

  const handleEdit = (partId: string) => {
    setEditState((prevState) => ({ ...prevState, [partId]: true }));
  };

  const handleSaveEdit = async (partId: string) => {
    const editedPart = editedParts[partId];
    if (!editedPart) return;

    try {
      await updatePartMutation({
        variables: {
          quantity: editedPart.quantity,
          location: editedPart.location,
          container: editedPart.container,
          bin: editedPart.bin,
          description: editedPart.description,
          model: editedPart.model,
          name: editedPart.name,
          brand: editedPart.brand,
          tags: editedPart.tags,
          updatePartId: partId,
        },
      });
      setEditState((prevState) => ({ ...prevState, [partId]: false }));
      // Update the filteredParts state with the edited part
      setFilteredParts((prevState) =>
        prevState.map((part) => (part.id === partId ? editedPart : part)),
      );
    } catch (error) {
      // Handle error if mutation fails
      console.error('Error updating part:', error);
    }
  };

  const handleCancelEdit = (partId: string) => {
    setEditState((prevState) => ({ ...prevState, [partId]: false }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    partId: string
  ) => {
    const { name, value } = e.target;
    // Convert quantity to a number
    const parsedValue = name === 'quantity' ? parseFloat(value) : value;
    setEditedParts((prevEditedParts) => ({
      ...prevEditedParts,
      [partId]: {
        ...(prevEditedParts[partId] || filteredParts.find((part) => part.id === partId)),
        [name]: parsedValue,
      },
    }));
  };

  return (
    <Center>
      <VStack spacing={4} maxWidth='97%' maxHeight={'54.3rem'} align='stretch'>
        <SearchBar onSearch={handleSearch} />
        <Box
          border='1px solid #ccc'
          p={4}
          borderRadius='md'
          w='100%'
          overflowY='auto'
          height={'100%'}
        >
          <Table variant='striped' size='sm'>
            <Thead>
              <Tr>
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
              {filteredParts.map((part: Part) => (
                <Tr key={part.id}>
                  {editState[part.id] ? (
                    <>
                      <Td>
                        <input
                          type='text'
                          name='brand'
                          value={editedParts[part.id]?.brand || part.brand}
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>

                      <Td>
                        <input
                          type='text'
                          name='name'
                          value={editedParts[part.id]?.name || part.name}
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>
                      <Td>
                        <input
                          type='text'
                          name='model'
                          value={editedParts[part.id]?.model || part.model}
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>
                      <Td>
                        <input
                          type='text'
                          name='description'
                          value={
                            editedParts[part.id]?.description ||
                            part.description
                          }
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>

                      <Td>
                        <input
                          type='text'
                          name='bin'
                          value={editedParts[part.id]?.bin || part.bin}
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>
                      <Td>
                        <input
                          type='text'
                          name='container'
                          value={
                            editedParts[part.id]?.container || part.container
                          }
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>

                      <Td>
                        <input
                          type='text'
                          name='location'
                          value={
                            editedParts[part.id]?.location || part.location
                          }
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>
                      <Td>
                        <input
                          type='text'
                          name='quantity'
                          value={
                            editedParts[part.id]?.quantity || part.quantity
                          }
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>
                      <Td>
                        <input
                          type='text'
                          name='tags'
                          value={editedParts[part.id]?.tags || part.tags}
                          onChange={(e) => handleInputChange(e, part.id)}
                        />
                      </Td>

                      {/* Repeat the same for other properties */}
                      <Td>
                        <button onClick={() => handleCancelEdit(part.id)}>
                          Cancel
                        </button>
                        <button onClick={() => handleSaveEdit(part.id)}>
                          Save
                        </button>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>{part.brand}</Td>
                      <Td>{part.name}</Td>
                      <Td>{part.model}</Td>
                      <Td>{part.description}</Td>
                      <Td>{part.bin}</Td>
                      <Td>{part.container}</Td>
                      <Td>{part.location}</Td>
                      <Td>{part.quantity}</Td>
                      <Td>{part.tags}</Td>
                      <Td>
                        <button onClick={() => handleEdit(part.id)}>
                          <EditIcon />
                        </button>
                      </Td>
                      <Td>
                        <DeletePartButton
                          partId={part.id}
                          onDelete={() => deletePart(part.id)}
                        />
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Center>
  );
};

export default PartsTable;
