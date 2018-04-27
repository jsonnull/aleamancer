// @flow
import { getCurrentUser } from 'api/models/user'

const currentUser = async (_: any, _args: {}, _ctx: Object) => {
  return getCurrentUser()
}

export default currentUser
