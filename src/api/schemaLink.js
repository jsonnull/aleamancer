// @flow
import { ApolloLink, Operation, FetchResult, Observable } from 'apollo-link'
import { execute, subscribe, GraphQLSchema } from 'graphql'

type SchemaLinkOptions = {
  schema: GraphQLSchema,
  rootValue?: any,
  context?: Function | any
}

const isSubscription = (operation: Operation): boolean => {
  const definitions = operation.query.definitions
  const operationDefinition = definitions.find(
    el => el.kind == 'OperationDefinition'
  )
  if (operationDefinition.operation == 'subscription') {
    return true
  }

  return false
}

export class SchemaLink extends ApolloLink {
  schema: GraphQLSchema
  rootValue: any
  context: Function | any

  constructor({ schema, rootValue, context }: SchemaLinkOptions) {
    super()

    this.schema = schema
    this.rootValue = rootValue
    this.context = context
  }

  request(operation: Operation): Observable<FetchResult> {
    return new Observable(observer => {
      // Determine if this is a subscription or not
      const requestIsSubscription = isSubscription(operation)

      if (requestIsSubscription) {
        Promise.resolve(
          subscribe(
            this.schema,
            operation.query,
            this.rootValue,
            typeof this.context === 'function'
              ? this.context(operation)
              : this.context,
            operation.variables,
            operation.operationName
          )
        ).then(async subscription => {
          // $FlowFixMe: expects subscription to be an instanceof AsyncIterable
          if (subscription.errors) {
            subscription.errors.forEach(error =>
              observer.error(error.originalError)
            )
          }

          // subscription is guaranteed to be an AsyncIterable at this point
          for await (const data of subscription) {
            observer.next(data)
          }

          observer.complete()
        })
      } else {
        Promise.resolve(
          execute(
            this.schema,
            operation.query,
            this.rootValue,
            typeof this.context === 'function'
              ? this.context(operation)
              : this.context,
            operation.variables,
            operation.operationName
          )
        )
          .then(data => {
            if (!observer.closed) {
              observer.next(data)
              observer.complete()
            }
          })
          .catch(error => {
            if (!observer.closed) {
              observer.error(error)
            }
          })
      }
    })
  }
}

export default SchemaLink
