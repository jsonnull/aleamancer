// @flow
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import SchemaLink from 'api/schemaLink'
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  MockList
} from 'graphql-tools'
import { typeDefs } from 'api/index'

// Put together a schema based on the type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs
})

const mocks = {
  Game: () => ({
    name: 'Test Session Name'
  }),
  currentUser: () => ({
    games: () => new MockList(2, () => ({ name: 'Test Session Name' }))
  })
}

addMockFunctionsToSchema({ schema, mocks })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
})

export default client
