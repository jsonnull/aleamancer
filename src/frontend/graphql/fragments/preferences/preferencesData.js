// @flow
import gql from 'graphql-tag'

export type PreferencesDataType = {
  chatPinned: boolean,
  theme: string
}

export default gql`
  fragment preferencesData on Preferences {
    chatPinned
    theme
  }
`
