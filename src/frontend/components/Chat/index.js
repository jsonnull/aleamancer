// @flow
import React from 'react'
import styled from 'styled-components'
import type { Message } from 'common/types'
import Header from './Header'
import Info from './Info'
import Compose from './Compose'
import MessageList from './MessageList'
import type { GetCurrentUserPreferencesType } from 'frontend/graphql/queries/currentUser/getCurrentUserPreferences'

const CHAT_WIDTH = '320px'

const Container = styled.div`
  background-color: ${props => props.theme.background};
  width: ${props => props.chatWidth};
  overflow: hidden;
  border-radius: ${props => (props.isPinned ? '0' : '5px')};
  box-shadow: ${props =>
    props.isPinned ? '' : '0 3px 5px 0 rgba(0, 0, 0, 0.2)'};

  height: ${props => (props.isPinned ? '100%' : 'auto')};
  position: ${props => (props.isPinned ? 'relative' : 'absolute')};
  top: ${props => (props.isPinned ? '0' : 'auto')};
  right: ${props => (props.isPinned ? '0' : '1rem')};
  bottom: ${props => (props.isPinned ? '0' : '1rem')};

  display: flex;
  flex-direction: column;
`

type Props = {
  messages: Array<Message>,
  preferences: GetCurrentUserPreferencesType,
  setChatPinned: Function,
  sendMessage: Function
}

class Chat extends React.Component<Props> {
  messageQueue: []

  sendMessage = (text: string) => {
    this.props.sendMessage(text.trim())
  }

  render() {
    const { currentUserWithPreferences, messages, setChatPinned } = this.props

    const messagesView = messages.loading
      ? []
      : messages.game.messageConnection.edges.map(edge => edge.node)

    const isPinned = currentUserWithPreferences.currentUser
      ? currentUserWithPreferences.currentUser.preferences.chatPinned
      : false

    const shownMessages = isPinned ? messagesView : messagesView.slice(-4)

    return (
      <Container chatWidth={CHAT_WIDTH} isPinned={isPinned}>
        <Header isPinned={isPinned} setChatPinned={setChatPinned} />
        <MessageList messages={shownMessages} isPinned={isPinned} />
        <Compose onSend={this.sendMessage} isPinned={isPinned} />
        <Info />
      </Container>
    )
  }
}

export default Chat
