// @flow
import gql from 'graphql-tag'
import gameInfoFragment from '../../fragments/game/gameInfo'
import type { GameInfoType } from '../../fragments/game/gameInfo'

export type GetCurrentUserGamesType = {
  ...$Exact<GameInfoType>
}

export const getCurrentUserGames = gql`
  query {
    currentUser {
      games {
        ...gameInfo
      }
    }
  }
  ${gameInfoFragment}
`
