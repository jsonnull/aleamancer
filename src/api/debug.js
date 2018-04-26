// @flow
import { ApolloLink } from 'apollo-link'

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`, operation)
  return forward(operation).map(data => {
    console.log(`ending request for ${operation.operationName}`, operation)
    return data
  })
})

export default consoleLink
