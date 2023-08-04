import { gql } from '@apollo/client';

export const CREATE_PART_MUTATION = gql`
  mutation CreatePart(
    $bin: String!
    $brand: String!
    $container: String!
    $description: String!
    $location: String!
    $model: String!
    $name: String!
    $quantity: Float!
    $tags: [String!]!
  ) {
    createPart(
      bin: $bin
      brand: $brand
      container: $container
      description: $description
      location: $location
      model: $model
      name: $name
      quantity: $quantity
      tags: $tags
    ) {
      bin
      brand
      container
      description
      location
      model
      name
      quantity
      tags
    }
  }
`;

export const UPDATE_PART_MUTATION = gql`
  mutation UpdatePartMutation(
    $quantity: Float!
    $location: String!
    $container: String!
    $bin: String!
    $description: String!
    $model: String!
    $name: String!
    $brand: String!
    $tags: [String!]
    $updatePartId: String!
  ) {
    updatePart(
      quantity: $quantity
      location: $location
      container: $container
      bin: $bin
      description: $description
      model: $model
      name: $name
      brand: $brand
      tags: $tags
      id: $updatePartId
    ) {
      id
      name
      brand
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

export const DELETE_PART_MUTATION = gql`
  mutation DeletePart($deletePartId: String!) {
    deletePart(id: $deletePartId)
  }
`;
