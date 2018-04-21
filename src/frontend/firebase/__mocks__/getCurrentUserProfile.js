// @flow
import type { UserProfile } from 'common/types'

const mockData = { displayName: 'test_user', photoURL: null }

const getCurrentUserProfile = (): UserProfile => mockData

export default getCurrentUserProfile
