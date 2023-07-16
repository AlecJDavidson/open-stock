import { gql } from '@apollo/client';

export interface Part {
  id: string;
  brand: string;
  name: string;
  model: string;
  description: string;
  bin: string;
  container: string;
  location: string;
  quantity: number;
  tags: string[];
}

export const SEARCH_PARTS = gql`
  query Query($search: String!) {
    partsBy(search: $search) {
      id
      brand
      name
      model
      description
      bin
      container
      location
      quantity
      tags
    }
  }
`;
