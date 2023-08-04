import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { Flex, HStack } from '@chakra-ui/react';
import { GET_ALL_PARTS } from '../../graphql/queries/partQueries';
import { Parts } from '../../types/Part';
import PartTable from '../ui/Table/Table';
import { usePartListContext } from '../../context/PartListContext';
import AddPartForm from '../ui/forms/AddPart';

import { Flex, HStack, VStack } from '@chakra-ui/react';

const Home: React.FC = () => {
  const { setParts } = usePartListContext();

  const [loading, setLoading] = useState(true);
  const { data } = useQuery<{ parts?: Parts }>(GET_ALL_PARTS);

  useEffect(() => {
    if (data?.parts) {
      const parts: Parts = data.parts;
      setParts(parts);
      setLoading(false);
    }
  }, [data, setParts]);

  if (loading) return <p>Loading...</p>;
  return (
    <Flex direction='column' mt={8}>
      <HStack mt={4} alignItems='flex-start'>
        <Flex alignItems='stretch'>
          <VStack>
            <AddPartForm />
          </VStack>
        </Flex>
        <VStack>
          <PartTable />
        </VStack>
      </HStack>
      <Flex alignItems='center' mt={4} ml={4}></Flex>
    </Flex>
  );
};

export default Home;
