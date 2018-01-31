// @flow
import { call, takeEvery } from 'redux-saga/effects'
import sendMessages, { sendMessageWithResult } from '../index'
import CommandParser from '../commandParser'
import { SEND_MESSAGE } from 'actions/types'
import sendMessage from 'firebase/sendMessage'

jest.mock('firebase/sendMessage')

const commandParser = new CommandParser()

describe('sendMessageWithResult generator', () => {
  const mockAction = { type: 'SEND_MESSAGE', text: 'test' }
  const mockName = 'user'
  const gen = sendMessageWithResult(commandParser, mockAction)

  it('should select the users display name from the store', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  it('should call the sendMessage function', () => {
    const expectedMessage = {
      text: mockAction.text,
      from: mockName,
      result: null
    }
    expect(gen.next(mockName).value).toEqual(call(sendMessage, expectedMessage))
  })
})

describe('sendMessages saga', () => {
  const gen = sendMessages()

  it('should run for every SEND_MESSAGE action', () => {
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(
        takeEvery(SEND_MESSAGE, sendMessageWithResult, commandParser)
      )
    )
  })
})
