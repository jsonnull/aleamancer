// @flow
import { getPreferencesById } from 'api/models/preferences'
import type { DBUser } from 'common/types'

const preferences = async (user: DBUser, args: {}, context: Object) => {
  const { id } = user

  return getPreferencesById(id)
}

export default preferences
