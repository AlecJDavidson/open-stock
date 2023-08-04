import React, { useState, ReactNode } from 'react';
import PartListContext from './PartListContext';
import { initialPartListState } from './PartListContext';
import { PartListState, Part } from '../types/Part';

const PartListContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [parts, setParts] = useState<PartListState>(initialPartListState);

  const addPart = (part: Part) => {
    setParts([...parts, part]);
  };

  const deletePart = (partId: string) => {
    setParts(parts.filter((part: Part) => part.id !== partId));
  };

  return (
    <PartListContext.Provider value={{ parts, setParts, addPart, deletePart }}>
      {children}
    </PartListContext.Provider>
  );
};

export default PartListContextProvider;
