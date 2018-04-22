// @flow
import gql from 'graphql-tag'

export type GameInfoType = {
  id: string,
  name: string
}

export default gql`
  fragment gameInfo on Game {
    id
    name
  }
`
