import React from 'react';
import { useMutation } from '@apollo/client';
import { IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { DELETE_PART_MUTATION } from '../../../graphql/mutations/partMutations';

interface DeleteButtonProps {
  partId: string;
  onDelete: () => void;
}

const DeletePartButton: React.FC<DeleteButtonProps> = ({
  partId,
  onDelete,
}) => {
  const [deletePartMutation] = useMutation(DELETE_PART_MUTATION);

  const handleDeletePart = async () => {
    try {
      await deletePartMutation({
        variables: {
          deletePartId: partId,
        },
      });

      console.log('Deleted part:', partId);
      onDelete();
    } catch (error) {
      console.error('Error while deleting the part');
    }
  };

  return (
    <IconButton
      size='sm'
      aria-label='Delete Part'
      icon={<CloseIcon />}
      onClick={handleDeletePart}
      _hover={{
        backgroundColor: 'red.500',
      }}
    />
  );
};

export default DeletePartButton;
