// @flow
import type { MessageResult } from 'common/types'

type SendMessageOpts = {
  from: string,
  text: string,
  result: ?MessageResult
}

const sendMessage = (_opts: SendMessageOpts): Promise<void> => {
  return new Promise(resolve => {
    resolve()
  })
}

export default sendMessage