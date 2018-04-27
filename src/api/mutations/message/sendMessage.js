// @flow
import { sendMessage } from 'api/models/message'

const sendMessageResolver = (
  _: any,
  { game, message: { text } }: { game: string, message: { text: string } },
  _ctx: any
) => {
  const message = sendMessage(game, text)
  return message
}

export default sendMessageResolver
