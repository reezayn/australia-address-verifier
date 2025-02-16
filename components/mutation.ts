import { gql } from '@apollo/client'

export const VALIDATE_ADDRESS = gql`
  mutation ValidateAddress(
    $postcode: String!
    $suburb: String!
    $state: String!
  ) {
    validateAddress(postcode: $postcode, suburb: $suburb, state: $state)
  }
`
