import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, MinusIcon, CloseIcon } from '@chakra-ui/icons';

import { SEARCH_PARTS } from '../../graphql/queries/partQueries';
import {
  UPDATE_PART_MUTATION,
  DELETE_PART_MUTATION,
} from '../../graphql/mutations/partMutations';
import { Part } from '../../types/Part';

const PartsSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { loading, data, refetch } = useQuery<{ partsBy: Part[] }>(
    SEARCH_PARTS,
    {
      variables: { search: searchQuery },
    },
  );
  const [updatePartMutation] = useMutation(UPDATE_PART_MUTATION);
  const [deletePartMutation] = useMutation(DELETE_PART_MUTATION);

  useEffect(() => {
    // Trigger the search query whenever the searchQuery state changes
    // Note: You can also debounce the search to avoid excessive requests.
    refetch({ search: searchQuery });
  }, [searchQuery, refetch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleIncreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      const updatedQuantity = currentQuantity + 1;
      await updatePartMutation({
        variables: {
          updatePartId: partId,
          quantity: updatedQuantity,
        },
        update(cache, { data: { updatePart } }) {
          const { partsBy } = cache.readQuery<{ partsBy: Part[] }>({
            query: SEARCH_PARTS,
            variables: { search: searchQuery },
          }) || { partsBy: [] };

          const updatedPartsBy = partsBy.map((part) =>
            part.id === updatePart.id ? { ...part, quantity: updatePart.quantity } : part
          );

          cache.writeQuery({
            query: SEARCH_PARTS,
            variables: { search: searchQuery },
            data: { partsBy: updatedPartsBy },
          });
        },
      });
    } catch (error) {
      console.error('Error while updating the quantity');
    }
  };

  const handleDecreaseQuantity = async (
    partId: string,
    currentQuantity: number,
  ) => {
    try {
      if (currentQuantity > 0) {
        const updatedQuantity = currentQuantity - 1;
        await updatePartMutation({
          variables: {
            updatePartId: partId,
            quantity: updatedQuantity,
          },
          update(cache, { data: { updatePart } }) {
            const { partsBy } = cache.readQuery<{ partsBy: Part[] }>({
              query: SEARCH_PARTS,
              variables: { search: searchQuery },
            }) || { partsBy: [] };

            const updatedPartsBy = partsBy.map((part) =>
              part.id === updatePart.id ? { ...part, quantity: updatePart.quantity } : part
            );

            cache.writeQuery({
              query: SEARCH_PARTS,
              variables: { search: searchQuery },
              data: { partsBy: updatedPartsBy },
            });
          },
        });
      }
    } catch (error) {
      console.error('Error while updating the quantity');
    }
  };

  const handleDeletePart = async (partId: string) => {
    try {
      await deletePartMutation({
        variables: {
          deletePartId: partId,
        },
      });

      console.log('Deleted part:', { partId });

      // Refetch the data after the delete mutation to update the table
      refetch();
    } catch (error) {
      console.error('Error while deleting the part');
    }
  };

  return (
    <Center>
      <Box border='1px solid #ccc' p={4} borderRadius='md' maxWidth={'95%'}>
        <InputGroup mt={4}>
          <Input
            placeholder='Search for parts...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <InputRightElement>
            <SearchIcon color='gray.300' cursor='pointer' />
          </InputRightElement>
        </InputGroup>
        <Table variant='striped' size='md' mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Brand</Th>
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
            {loading ? (
              <Tr>
                <Td colSpan={10}>Loading...</Td>
              </Tr>
            ) : (
              data?.partsBy.map((part) => (
                <Tr key={part.id}>
                  <Td>{part.name}</Td>
                  <Td>{part.brand}</Td>
                  <Td>{part.model}</Td>
                  <Td>{part.description}</Td>
                  <Td>{part.bin}</Td>
                  <Td>{part.container}</Td>
                  <Td>{part.location}</Td>
                  <Td>
                    <IconButton
                      size='sm'
                      aria-label='Decrease Quantity'
                      icon={<MinusIcon />}
                      onClick={() =>
                        handleDecreaseQuantity(part.id, part.quantity)
                      }
                    />
                    &nbsp;{part.quantity}&nbsp;
                    <IconButton
                      size='sm'
                      aria-label='Increase Quantity'
                      icon={<AddIcon />}
                      onClick={() =>
                        handleIncreaseQuantity(part.id, part.quantity)
                      }
                    />
                  </Td>
                  <Td>{part.tags.join(', ')}</Td>
                  <Td>
                    <IconButton
                      size='sm'
                      aria-label='Delete Part'
                      icon={<CloseIcon />}
                      onClick={() => handleDeletePart(part.id)}
                      _hover={{
                        backgroundColor: 'red.500',
                      }}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
};

export default PartsSearch;
