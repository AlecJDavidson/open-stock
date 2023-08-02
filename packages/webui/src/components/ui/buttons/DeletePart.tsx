import { useMutation } from '@apollo/client';
import { DELETE_PART_MUTATION } from '../../../graphql/mutations/partMutations';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface DeleteButtonProps {
  partId: string; // Define the type for partId
}

const DeleteButton = ({ partId }: DeleteButtonProps) => {
  const [deletePartMutation] = useMutation(DELETE_PART_MUTATION);

  const handleDeletePart = async () => {
    try {
      await deletePartMutation({
        variables: {
          deletePartId: partId, // Pass partId as a string to the mutation
        },
      });

      console.log('Deleted part:', partId);

      // Refetch the data after the delete mutation to update the table
    } catch (error) {
      console.error('Error while deleting the part');
    }
  };

  return (
    <IconButton
      size='sm'
      aria-label='Delete Part'
      icon={<CloseIcon />}
      onClick={handleDeletePart} // No need to pass partId here, it's already in scope
      _hover={{
        backgroundColor: 'red.500',
      }}
    />
  );
};

export default DeleteButton;
