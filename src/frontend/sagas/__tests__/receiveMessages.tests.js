// @flow
import { put, take } from 'redux-saga/effects'
import { cloneableGenerator, createMockTask } from 'redux-saga/utils'
import { receiveMessage } from 'frontend/actions'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from 'frontend/actions/types'
import receiveMessages, { subscribeToMessages } from '../receiveMessages'

jest.mock('../../firebase/messages')

const mockMessage = {
  id: 'test',
  from: 'testFrom',
  text: 'test message text',
  result: null,
  timestamp: 0
}

describe('subscribeToMessages generator', () => {
  const gen = subscribeToMessages()

  it('should wait for a message to be received', () => {
    expect(gen.next().value).toHaveProperty('TAKE')
  })

  it('should put the message which was received', () => {
    expect(gen.next(mockMessage).value).toEqual(
      put(receiveMessage(mockMessage))
    )
  })

  it('should repeat', () => {
    expect(gen.next().done).toBe(false)
  })
})

describe('receiveMessages saga', () => {
  const gen = cloneableGenerator(receiveMessages)()
  const loginAction = { type: USER_LOGGED_IN }
  const logoutAction = { type: USER_LOGGED_OUT }

  const loginFlow = gen.clone()
  it('should wait for user login or logout', () => {
    expect(loginFlow.next().value).toEqual(
      take([USER_LOGGED_IN, USER_LOGGED_OUT])
    )
  })

  it('should create a subscription on login', () => {
    expect(loginFlow.next(loginAction).value).toHaveProperty('FORK')
    const forkedTask = createMockTask()
    expect(loginFlow.next(forkedTask).value).toEqual(
      take([USER_LOGGED_IN, USER_LOGGED_OUT])
    )
  })

  it('should cancel the subscription upon logout', () => {
    expect(loginFlow.next(logoutAction).value).toHaveProperty('CANCEL')
  })

  const logoutFlow = gen.clone()
  it('should allow logout if no subscription is present', () => {
    // Waiting for login/logout
    expect(logoutFlow.next().value).toEqual(
      take([USER_LOGGED_IN, USER_LOGGED_OUT])
    )
    // Given logout, continues to wait
    expect(logoutFlow.next(logoutAction).value).toEqual(
      take([USER_LOGGED_IN, USER_LOGGED_OUT])
    )
  })
})
