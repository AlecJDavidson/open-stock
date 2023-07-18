import { gql } from '@apollo/client'

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
`

export const GET_ALL_PARTS = gql`
  query GetAllParts {
    parts {
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
