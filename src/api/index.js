// @flow
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'
import SchemaLink from './schemaLink'

import scalars from './types/scalars'
import Game from './types/Game'
import Message from './types/Message'
import User from './types/User'

import gameQueries from './queries/game'
import userQueries from './queries/user'

import messageMutations from './mutations/message'
import userMutations from './mutations/user'

import messageSubscriptions from './subscriptions/message'

const Root = `
  # The root types, which will all be extended
  type Query

  type Mutation

  type Subscription

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

// Collect the type definitions
export const typeDefs = [scalars.typeDefs, Root, Game, Message, User]

// Collect the resolvers
const resolvers = merge(
  {},
  scalars.resolvers,
  // Queries
  gameQueries,
  userQueries,
  // Mutations
  messageMutations,
  userMutations,
  // Subscriptions
  messageSubscriptions
)

// Put together a schema based on the type definitions and resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: concat(consoleLink, new SchemaLink({ schema }))
  link: new SchemaLink({ schema })
})

export default client
