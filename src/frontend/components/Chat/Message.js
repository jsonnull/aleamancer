// @flow
import React from 'react'
import styled from 'styled-components'
import Timeago from 'timeago.js'
import type { Message } from 'common/types'
import { fontSize } from 'frontend/styles/common'
import MessageResult from './MessageResult'

type Props = {
  message: Message,
  isPinned: boolean
}

const MessageContainer = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  display: inline-block;
  width: 100%;

  &:first-child {
    margin-top: auto;
  }
`

const From = styled.div`
  font-weight: bold;
  font-size: ${fontSize.small};
  color: ${props => props.theme.colorSecondary};
  padding: 0.2rem 1rem 0;
`

const Sent = styled.span`
  color: #999;
  font-weight: normal;
  font-style: italic;
`

const Text = styled.div`
  padding: 0 1rem 0.2rem;
  color: ${props => props.theme.color};
`

export default class MessageView extends React.Component<Props> {
  render() {
    const { isPinned } = this.props
    const { from, timestamp, text, result } = this.props.message
    const hoverText = new Date(timestamp)
    const formattedDate = new Timeago().format(timestamp)
    return (
      <MessageContainer isPinned={isPinned}>
        <From>
          {from} <Sent title={hoverText}>{formattedDate}</Sent>
        </From>
        <Text>{text}</Text>
        <MessageResult result={result} />
      </MessageContainer>
    )
  }
}
