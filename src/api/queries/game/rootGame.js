// @flow
import { getGameById } from 'api/models/game'

const game = async (_: any, args: { id: string }, context: Object) => {
  const { id } = args

  return getGameById(id)
}

export default game
