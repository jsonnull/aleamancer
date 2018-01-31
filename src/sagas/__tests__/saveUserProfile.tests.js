// @flow
import { take, put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { changeDisplayName } from 'actions'
import { CHANGE_DISPLAY_NAME } from 'actions/types'
import saveUserProfile from '../saveUserProfile'
import getCurrentUserEmail from 'firebase/getCurrentUserEmail'
import saveProfile from 'firebase/saveProfile'

jest.mock('firebase/getCurrentUserEmail')
jest.mock('firebase/saveProfile')

describe('saveUserProfile saga', () => {
  const mockId = 'testUserId'
  const mockEmail = 'email@example.com'
  const gen = cloneableGenerator(saveUserProfile)()

  const emptyNameAction = { type: CHANGE_DISPLAY_NAME, id: mockId, name: '' }
  const emptyNameProfile = {
    displayName: ''
  }
  const filledNameAction = {
    type: CHANGE_DISPLAY_NAME,
    id: mockId,
    name: 'test'
  }
  const filledNameProfile = {
    displayName: 'test',
    photoURL: null
  }
  const withEmptyName = gen.clone()
  const withUserName = gen.clone()

  it('should wait for user profile to change', () => {
    expect(withEmptyName.next().value).toEqual(take(CHANGE_DISPLAY_NAME))
  })

  it('should select the user profile from the store', () => {
    expect(withEmptyName.next(emptyNameAction).value).toHaveProperty('SELECT')
  })

  it('should get the users email if no name is present', () => {
    expect(withEmptyName.next(emptyNameProfile).value).toEqual(
      call(getCurrentUserEmail)
    )
  })

  it('should put the users email in place of the name', () => {
    expect(withEmptyName.next(mockEmail).value).toEqual(
      put(changeDisplayName(mockId, mockEmail))
    )
  })

  it('should save the profile if name is present', () => {
    // Take, select
    withUserName.next()
    withUserName.next(filledNameAction)
    expect(withUserName.next(filledNameProfile).value).toEqual(
      call(saveProfile, filledNameProfile)
    )
  })
})
