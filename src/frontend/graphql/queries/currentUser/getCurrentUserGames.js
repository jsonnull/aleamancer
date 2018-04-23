// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import gameInfoFragment from '../../fragments/game/gameInfo'
import type { GameInfoType } from '../../fragments/game/gameInfo'

export type GetCurrentUserGamesType = {
  ...$Exact<GameInfoType>
}

export const getCurrentUserGamesQuery = gql`
  query {
    currentUser {
      games {
        ...gameInfo
      }
    }
  }
  ${gameInfoFragment}
`

export const getCurrentUserGames = graphql(getCurrentUserGamesQuery, {
  name: 'currentUserWithGames'
})
