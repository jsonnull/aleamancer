// @flow
import React from 'react'
import { Container, Loading, Error } from './styles'
import Header from './Header'
import Info from './Info'
import Compose from './Compose'
import MessageList from './MessageList'
import type { GetGameMessagesType } from 'frontend/graphql/queries/game/getGameMessages'
import type { GetCurrentUserPreferencesType } from 'frontend/graphql/queries/currentUser/getCurrentUserPreferences'

type Props = {
  gameWithMessages: {
    loading: boolean,
    error: ?string,
    game: GetGameMessagesType
  },
  subscribeToNewMessages: Function,
  currentUserWithPreferences: {
    loading: boolean,
    error: ?string,
    currentUser: GetCurrentUserPreferencesType
  },
  setChatPinned: Function,
  sendMessage: Function
}

type State = {
  subscription: ?Function
}

class Chat extends React.Component<Props, State> {
  state = {
    subscription: null
  }

  sendMessage = (text: string) => {
    this.props.sendMessage(text.trim())
  }

  componentDidMount() {
    this.subscribe()
  }

  componentDidUpdate(prev: Props) {
    const { gameWithMessages } = this.props

    // Do not allow old subscription messages to continue if we're mounting a
    // new chat or regaining network status
    if (gameWithMessages.loading) {
      this.unsubscribe()
    }

    if (prev.gameWithMessages.loading && !gameWithMessages.loading) {
      this.subscribe()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  subscribe = () => {
    this.setState({
      subscription: this.props.subscribeToNewMessages()
    })
  }

  unsubscribe = () => {
    const { subscription } = this.state
    if (subscription) {
      // Perform unsubscribe from subscribeToMore
      subscription()
    }
  }

  render() {
    const {
      currentUserWithPreferences,
      gameWithMessages,
      setChatPinned
    } = this.props

    if (currentUserWithPreferences.loading || gameWithMessages.loading) {
      return (
        <Container>
          <Loading>Connecting to chat...</Loading>
        </Container>
      )
    }

    if (currentUserWithPreferences.error || gameWithMessages.error) {
      return (
        <Container>
          <Error>There was an error.</Error>
        </Container>
      )
    }

    const messages = gameWithMessages.game.messageConnection.edges.map(
      edge => edge.node
    )

    const isPinned =
      currentUserWithPreferences.currentUser.preferences.chatPinned

    const shownMessages = isPinned ? messages : messages.slice(-4)

    return (
      <Container isPinned={isPinned}>
        <Header isPinned={isPinned} setChatPinned={setChatPinned} />
        <MessageList messages={shownMessages} isPinned={isPinned} />
        <Compose onSend={this.sendMessage} isPinned={isPinned} />
        <Info />
      </Container>
    )
  }
}

export default Chat
