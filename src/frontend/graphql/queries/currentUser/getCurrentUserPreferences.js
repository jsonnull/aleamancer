// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import preferencesDataFragment from '../../fragments/preferences/preferencesData'
import type { PreferencesDataType } from '../../fragments/preferences/preferencesData'

export type GetCurrentUserPreferencesType = {
  preferences: {
    ...$Exact<PreferencesDataType>
  }
}

export const getCurrentUserPreferencesQuery = gql`
  query currentUserPreferences {
    currentUser {
      preferences {
        ...preferencesData
      }
    }
  }
  ${preferencesDataFragment}
`

export const getCurrentUserPreferences = graphql(
  getCurrentUserPreferencesQuery,
  { name: 'currentUserWithPreferences' }
)
