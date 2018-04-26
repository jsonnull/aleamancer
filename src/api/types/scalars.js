// @flow
const GraphQLDate = require('graphql-date')

const typeDefs = `
  scalar Date
`

const resolvers = {
  Date: GraphQLDate
}

export default {
  typeDefs,
  resolvers
}
