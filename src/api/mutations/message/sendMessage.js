// @flow
import { sendMessage } from 'api/models/message'

const sendMessageResolver = (
  _: any,
  { game, message: { text } }: { game: string, input: { text: string } },
  ctx: any
) => {
  const message = sendMessage(game, text)
  return message
}

export default sendMessageResolver
