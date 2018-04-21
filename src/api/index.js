// @flow
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import Game from './types/Game'
import Message from './types/Message'
import Preferences from './types/Preferences'
import User from './types/User'

import gameQueries from './queries/game'
import preferencesQueries from './queries/preferences'
import userQueries from './queries/user'

import preferencesMutations from './mutations/preferences'
import messageMutations from './mutations/message'

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
export const typeDefs = [Root, Game, Message, Preferences, User]

// Collect the resolvers
const resolvers = merge(
  {},
  // Queries
  gameQueries,
  preferencesQueries,
  userQueries,
  // Mutations
  preferencesMutations,
  messageMutations
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
