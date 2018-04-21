// @flow
import { withProps, mapProps, compose } from 'recompose'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Chat from 'frontend/components/Chat'

const chatPinned = gql`
  query {
    preferences {
      chatPinned
    }
  }
`

const setChatPinned = gql`
  mutation SetChatPinned($isPinned: Boolean!) {
    setChatPinned(isPinned: $isPinned) {
      chatPinned
    }
  }
`

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
  graphql(chatPinned, { name: 'chatPinned' }),
  graphql(setChatPinned, { name: 'setChatPinned' }),
  graphql(sendMessage, { name: 'sendMessage' }),
  mapProps(props => ({
    ...props,
    setChatPinned: isPinned => props.setChatPinned({ variables: { isPinned } }),
    sendMessage: (...args) => {
      console.log(args)
      props.setChatPinned()
    }
  }))
)(Chat)
