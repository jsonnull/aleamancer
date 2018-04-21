// @flow
import { getGameFromRef } from 'api/models/game'
import type { DBUser } from 'common/types'

const games = async (user: DBUser, args: {}, context: Object) => {
  const { sessions } = user

  return Promise.all(sessions.map(getGameFromRef))
}

export default games
