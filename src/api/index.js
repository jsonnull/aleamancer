// @flow
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import Game from './types/Game'
import Message from './types/Message'
import User from './types/User'

import gameQueries from './queries/game'
import userQueries from './queries/user'

import messageMutations from './mutations/message'
import userMutations from './mutations/user'

const Root = `
  # The root types, which will all be extended
  type Query

  type Mutation

  #type Subscription

  schema {
    query: Query
    mutation: Mutation
    #subscription: Subscription
  }
`

// Collect the type definitions
export const typeDefs = [Root, Game, Message, User]

// Collect the resolvers
const resolvers = merge(
  {},
  // Queries
  gameQueries,
  userQueries,
  // Mutations
  messageMutations,
  userMutations
)

// Put together a schema based on the type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
})

export default client
