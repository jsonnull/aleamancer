/* @flow */
import React from 'react'
import MessageView from '../Message'
import type { Message } from 'types'
import styles from './style.css'

type Props = {
  messages: Array<Message>
}

export default class MessageList extends React.Component<*, Props, *> {
  timer: number
  scroll: HTMLElement

  componentDidMount () {
    // Every minute, update chat timestamps
    this.timer = setInterval(() => this.forceUpdate(), 60000)
  }

  componentDidUpdate () {
    this.scroll.scrollTop += 10000
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <div
      className={ styles.messages }
      ref={el => { this.scroll = el }}
    >
      {this.props.messages.map(message =>
        <MessageView key={message.key} message={message} />
      )}
      <div className={ styles.spacer }>&nbsp;</div>
    </div>
  }
}
