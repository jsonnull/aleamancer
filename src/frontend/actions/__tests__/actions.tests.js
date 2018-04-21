// @flow
import * as actions from '../index'

/*
 * All action creators should be tested in their corresponding reducer(s)
 * Some actions are acted on by reducers, those should be tested here
 * TODO: Can we test those in their sagas and eliminate this file entirely?
 */

describe('actions', () => {
  it('should create an action to send a message', () => {
    const text = 'message text'
    expect(actions.sendMessage(text)).toEqual({
      type: 'SEND_MESSAGE',
      text
    })
  })
})
