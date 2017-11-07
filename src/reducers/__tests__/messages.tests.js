// @flow
import reduce from '../messages'
import { receiveMessage } from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = []

describe('messages reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle RECEIVE_MESSAGE', () => {
    expect(
      reduce(undefined, receiveMessage({ key: 'test', text: 'text' }))
    ).toEqual(
      expect.arrayContaining([
        {
          key: 'test',
          text: 'text'
        }
      ])
    )
  })

  it('should not allow duplicate messages', () => {
    const message = { key: 'unique' }

    const state = reduce([], receiveMessage(message))
    const finalState = reduce(state, receiveMessage(message))

    expect(finalState).toHaveLength(1)
  })
})
