/* @flow */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import type { State } from 'store'

const Toggle = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

type Props = {
  pinned: boolean,
  togglePinned: Function
}

class ChatPin extends React.Component<*, Props, *> {
  render() {
    const { pinned, togglePinned } = this.props

    let toggleChat = pinned ? (
      <i className="fa fa-chevron-right" />
    ) : (
      <i className="fa fa-chevron-left" />
    )

    return <Toggle onClick={togglePinned}>{toggleChat}</Toggle>
  }
}

const mapStateToProps = (state: State, ownProps) => ({
  pinned: state.user.preferences.chatPinned
})

const mapDispatchToProps = (dispatch: Function) => ({
  togglePinned: () => dispatch({ type: 'TOGGLE_CHAT_PIN' })
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatPin)
