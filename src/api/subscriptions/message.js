// @flow
import asyncify from 'callback-to-async-iterator'
import { listenToNewMessages } from 'api/models/message'

const messageAdded = {
  resolve: (message: any) => message,
  subscribe: (
    _: any,
    { game }: { game: string },
    _ctx: Object,
    _info: Object
  ) => {
    const listener = listenToNewMessages(game)
    const asyncIter = asyncify(listener)
    return asyncIter
  }
}

export default {
  Subscription: {
    messageAdded
  }
}
