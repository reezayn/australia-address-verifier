import { gql } from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    validateAddress(postcode: String!, suburb: String!, state: String!): String!
  }
`

export const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
  Mutation: {
    validateAddress: async (
      _: unknown,
      {
        postcode,
        suburb,
        state,
      }: { postcode: string; suburb: string; state: string }
    ): Promise<string> => {
      try {
        const url = `https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com/staging/postcode/search.json?q=${encodeURIComponent(
          suburb
        )}&state=${encodeURIComponent(state)}`

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.API_BEARER_TOKEN}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data from Australia Post API.')
        }
        const text = await response.text()
        const data =
          text.trim() === ''
            ? { localities: { locality: [] } }
            : JSON.parse(text)

        let localities = data?.localities?.locality

        // this here for ensuring localities is an array 
        if (localities && !Array.isArray(localities)) {
          localities = [localities]
        }

        if (!localities || localities.length === 0) {
          return `The suburb ${suburb} does not exist in the state ${state} (${state}).`
        }

        const inputSuburb = suburb.trim().toUpperCase()
        const inputPostcode = postcode.trim()

        const matchingLocalities = localities.filter(
          (loc: any) =>
            loc.location.toUpperCase() === inputSuburb &&
            loc.state.toUpperCase() === state.toUpperCase()
        )
        if (!matchingLocalities) {
          return `The suburb ${suburb} does not exist in the state ${state} (${state}).`
        }
        const matchingLocality = matchingLocalities.find(
          (loc: any) =>
            loc.location.toUpperCase() === inputSuburb &&
            loc.state.toUpperCase() === state.toUpperCase() &&
            loc.postcode.toString() === inputPostcode
        )

        if (!matchingLocality) {
          return `The postcode ${postcode} does not match the suburb ${suburb}.`
        }

        return 'The postcode, suburb, and state input are valid.'
      } catch (error: any) {
        return `Error during address validation: ${error.message}`
      }
    },
  },
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
