// @flow
import type { MessageResult } from 'types'

type SendMessageOpts = {
  from: string,
  text: string,
  result: ?MessageResult
}

const sendMessage = (opts: SendMessageOpts): Promise<void> => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

export default sendMessage
