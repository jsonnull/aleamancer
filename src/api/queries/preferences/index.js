// @flow
import { getPreferencesForCurrentUser } from 'api/models/preferences'

const preferences = (_: any, args: {}, context: Object) => {
  return getPreferencesForCurrentUser()
}

export default {
  Query: {
    preferences
  }
}
