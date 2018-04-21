// @flow
import { getCurrentUser } from 'api/models/user'

const currentUser = async (_: any, args: {}, context: Object) => {
  return getCurrentUser()
}

export default currentUser
