// @flow
import { withProps, mapProps, compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Chat from 'frontend/components/Chat'
import setChatPinned from 'frontend/graphql/mutations/user/setChatPinned'
import { getCurrentUserPreferences } from 'frontend/graphql/queries/currentUser/getCurrentUserPreferences'
import { getGameMessagesByMatch } from 'frontend/graphql/queries/game/getGameMessages'

const sendMessage = gql`
  mutation SendMessage($message: MessageInput!) {
    sendMessage(message: $message) {
      message
    }
  }
`

export default compose(
  withProps({
    messages: []
  }),
  getGameMessagesByMatch,
  getCurrentUserPreferences,
  setChatPinned,
  graphql(sendMessage, { name: 'sendMessage' }),
  mapProps(props => ({
    ...props,
    sendMessage: (...args) => {
      console.log(args)
    }
  }))
)(Chat)
