// @flow
import reduce from '../messages'
import { receiveMessage } from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = []

describe('messages reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  const message = {
    key: 'unique',
    from: 'test1',
    text: 'messageText',
    timestamp: 0,
    result: undefined
  }
  it('should handle RECEIVE_MESSAGE', () => {
    expect(reduce(undefined, receiveMessage(message))).toEqual(
      expect.arrayContaining([message])
    )
  })

  it('should not allow duplicate messages', () => {
    const state = reduce([], receiveMessage(message))
    const finalState = reduce(state, receiveMessage(message))

    expect(finalState).toHaveLength(1)
  })
})
