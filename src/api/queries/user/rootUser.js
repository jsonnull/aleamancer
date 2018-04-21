// @flow
import { getUserById } from 'api/models/user'

const user = async (_: any, args: { id: string }, context: Object) => {
  const { id } = args

  return getUserById(id)
}

export default user
