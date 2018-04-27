// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { getCurrentUserPreferencesQuery } from '../../queries/currentUser/getCurrentUserPreferences'
import preferencesDataFragment from '../../fragments/preferences/preferencesData'
import type { PreferencesDataType } from '../../fragments/preferences/preferencesData'

export type SetChatPinnedType = {
  data: {
    preferences: {
      ...$Exact<PreferencesDataType>
    }
  }
}

const setChatPinnedMutation = gql`
  mutation setChatPinned($isPinned: Boolean!) {
    setChatPinned(isPinned: $isPinned) {
      ...preferencesData
    }
  }
  ${preferencesDataFragment}
`

const setChatPinnedOptions = {
  props: ({ _ownProps, mutate }) => ({
    // Add setChatPinned on props based on `mutate`
    setChatPinned: (isPinned: boolean) => {
      return mutate({
        variables: {
          isPinned
        },
        optimisticResponse: {
          __typename: 'Mutation',
          setChatPinned: {
            __typename: 'Preferences',
            theme: 'light',
            chatPinned: isPinned
          }
        },
        update: (store, { data: { setChatPinned } }) => {
          const data = store.readQuery({
            query: getCurrentUserPreferencesQuery
          })

          // Perform the modification to the preferences
          data.currentUser.preferences.chatPinned = setChatPinned.chatPinned

          store.writeQuery({
            query: getCurrentUserPreferencesQuery,
            data
          })
        }
      })
    }
  })
}

export default graphql(setChatPinnedMutation, setChatPinnedOptions)
