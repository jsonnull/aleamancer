/* @flow */
import React from 'react'
import type { Message } from 'types'
import MessageResult from './MessageResult'
import Timeago from 'timeago.js'
import styles from './style.css'

type Props = {
  message: Message
}

export default class MessageView extends React.Component<*, Props, *> {
  render () {
    const { from, timestamp, text, result } = this.props.message
    return <div className={styles.message}>
      <div className={styles.from}>
        { from }{' '}
        <span className={styles.date} title={ Date(timestamp) }>
          { new Timeago().format(timestamp) }
        </span>
      </div>
      <div className={styles.text}>
        { text }
      </div>
      <MessageResult result={result} />
    </div>
  }
}
