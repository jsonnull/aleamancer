// @flow
import { call, put, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { changeDisplayName } from 'frontend/actions'
import { CHANGE_DISPLAY_NAME } from 'frontend/actions/types'
import saveUserProfile from '../saveUserProfile'
import saveProfile from 'frontend/firebase/saveProfile'

jest.mock('frontend/firebase/saveProfile')

describe('saveUserProfile saga', () => {
  const mockEmail = 'email@example.com'
  const gen = cloneableGenerator(saveUserProfile)()

  const emptyNameAction = { type: CHANGE_DISPLAY_NAME, name: '' }
  const emptyNameProfile = {
    email: mockEmail,
    photoURL: null,
    displayName: ''
  }
  const filledNameAction = {
    type: CHANGE_DISPLAY_NAME,
    name: 'test'
  }
  const filledNameProfile = {
    email: mockEmail,
    photoURL: null,
    displayName: 'test'
  }
  const withEmptyName = gen.clone()
  const withUserName = gen.clone()

  it('should wait for user profile to change', () => {
    expect(withEmptyName.next().value).toEqual(take(CHANGE_DISPLAY_NAME))
  })

  it('should select the user profile from the store', () => {
    expect(withEmptyName.next(emptyNameAction).value).toHaveProperty('SELECT')
  })

  it('should put the users email in place of the name', () => {
    expect(withEmptyName.next(emptyNameProfile).value).toEqual(
      put(changeDisplayName(mockEmail))
    )
  })

  it('should save the profile if name is present', () => {
    // Take, select
    withUserName.next()
    withUserName.next(filledNameAction)
    expect(withUserName.next(filledNameProfile).value).toEqual(
      call(saveProfile, {
        photoURL: null,
        displayName: 'test'
      })
    )
  })
})
