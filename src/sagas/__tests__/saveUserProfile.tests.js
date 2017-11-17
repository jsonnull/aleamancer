// @flow
import { take, put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { changeDisplayName } from 'actions'
import { CHANGE_DISPLAY_NAME } from 'actions/types'
import saveUserProfile from '../saveUserProfile'
import type { UserProfileState } from 'reducers/user/profile'

describe('saveUserProfile saga', () => {
  const mockEmail = 'email@example.com'
  const mockGetUserEmail = () => mockEmail
  const mockSaveProfile = () => {}
  const gen = cloneableGenerator(saveUserProfile)(
    mockGetUserEmail,
    mockSaveProfile
  )

  const emptyNameProfile = {
    displayName: ''
  }
  const filledNameProfile = {
    displayName: 'test'
  }
  const withEmptyName = gen.clone()
  const withUserName = gen.clone()

  it('should wait for user profile to change', () => {
    expect(withEmptyName.next().value).toEqual(take(CHANGE_DISPLAY_NAME))
  })

  it('should select the user profile from the store', () => {
    expect(withEmptyName.next().value).toHaveProperty('SELECT')
  })

  it('should get the users email if no name is present', () => {
    expect(withEmptyName.next(emptyNameProfile).value).toEqual(
      call(mockGetUserEmail)
    )
  })

  it('should put the users email in place of the name', () => {
    expect(withEmptyName.next(mockEmail).value).toEqual(
      put(changeDisplayName(mockEmail))
    )
  })

  it('should save the profile if name is present', () => {
    // Take, select
    withUserName.next()
    withUserName.next()
    expect(withUserName.next(filledNameProfile).value).toEqual(
      call(mockSaveProfile, filledNameProfile)
    )
  })
})
