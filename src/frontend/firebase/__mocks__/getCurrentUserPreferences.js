// @flow
import type { PreferencesState } from 'frontend/reducers/preferences'

const mockData = { theme: 'light', chatPinned: true }

const getUserPreferences = (): Promise<PreferencesState> =>
  new Promise(resolve => resolve(mockData))

export default getUserPreferences
