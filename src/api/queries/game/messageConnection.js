// @flow
import { getMessagesByGameId } from 'api/models/message'
import type { DBGame } from 'common/types'

const messageConnection = async (
  { id }: DBGame,
  { first }: { first: number },
  context: Object
) => {
  const messages = await getMessagesByGameId(id, first)

  return {
    edges: messages.map(message => ({
      cursor: message.timestamp.toString(),
      node: message
    }))
  }
}

export default messageConnection
