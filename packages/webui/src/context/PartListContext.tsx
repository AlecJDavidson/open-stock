import React, { createContext, useContext } from 'react';
import { PartListState, Part } from '../types/Part';

export const initialPartListState: PartListState = {
  parts: [],

};

const PartListContext = createContext<{
  parts: PartListState;
  addPart: (part: Part) => void;
  deletePart: (partId: string) => void;
  setParts: React.Dispatch<React.SetStateAction<PartListState>>;
}>({
  parts: initialPartListState,
  addPart: () => {},
  deletePart: () => {},
  setParts: () => {
    [
      {
        bin: '',
        brand: '',
        container: '',
        description: '',
        location: '',
        model: '',
        name: '',
        quantity: 0,
        tags: [],
      },
    ];
  },
});

export const usePartListContext = (): Part[] => useContext(PartListContext);

export default PartListContext;
