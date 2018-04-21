// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Message } from 'common/types'
import MessageView from './Message'

const MessagesWrapper = styled.div`
  min-height: 0;
  flex: 1;
`
const Messages = styled.div`
  overflow-y: ${props => (props.isPinned ? 'scroll' : 'hidden')};
  overflow-x: hidden;
  width: 315px;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex: ${props => (props.isPinned ? '1' : 'none')};

  align-items: ${props => (props.isPinned ? '' : 'flex-end')};
`

type Props = {
  messages: Array<Message>,
  isPinned: boolean
}

export default class MessageList extends React.Component<Props> {
  timer: IntervalID
  scroll: ?HTMLElement

  componentDidMount() {
    // Every minute, update chat timestamps
    this.timer = setInterval(() => this.forceUpdate(), 60000)
  }

  componentDidUpdate() {
    if (this.scroll) {
      this.scroll.scrollTop += 10000
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { isPinned } = this.props
    return (
      <MessagesWrapper>
        <Messages
          isPinned={isPinned}
          innerRef={el => {
            this.scroll = el
          }}
        >
          {this.props.messages.map(message => (
            <MessageView
              key={message.id}
              message={message}
              isPinned={isPinned}
            />
          ))}
        </Messages>
      </MessagesWrapper>
    )
  }
}
