// @flow
import { call, takeEvery } from 'redux-saga/effects'
import sendMessages, { sendMessageWithResult } from '../index'
import CommandParser from '../commandParser'
import { SEND_MESSAGE } from 'actions/types'
import type { MessageResult } from 'types'

const mockSendMessage = () => {}
const commandParser = new CommandParser()

describe('sendMessageWithResult generator', () => {
  const mockAction = { type: 'SEND_MESSAGE', text: 'test' }
  const mockName = 'user'
  const gen = sendMessageWithResult(mockSendMessage, commandParser, mockAction)

  it('should select the users display name from the store', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  it('should call the sendMessage function', () => {
    const expectedMessage = {
      text: mockAction.text,
      name: mockName,
      result: null
    }
    expect(gen.next(mockName).value).toEqual(
      call(mockSendMessage, expectedMessage)
    )
  })
})

describe('sendMessages saga', () => {
  const gen = sendMessages(mockSendMessage)

  it('should run for every SEND_MESSAGE action', () => {
    expect(JSON.stringify(gen.next().value)).toEqual(
      JSON.stringify(
        takeEvery(
          SEND_MESSAGE,
          sendMessageWithResult,
          mockSendMessage,
          commandParser
        )
      )
    )
  })
})
