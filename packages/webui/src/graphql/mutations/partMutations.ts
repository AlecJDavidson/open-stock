import { gql } from '@apollo/client'


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
`
