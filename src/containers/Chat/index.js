// @flow
import React from 'react'
import { connect } from 'react-redux'
import Chat from '../../components/Chat'
import { sendMessage } from 'actions'
import { TOGGLE_CHAT_PIN } from 'actions/types'
import type { Message, ThemeName } from 'types'
import type { State } from 'store'

type StateProps = {
  messages: Array<Message>,
  isPinned: boolean
}
const mapStateToProps = (state: State): StateProps => ({
  messages: state.messages,
  isPinned: state.user.preferences.chatPinned
})

type DispatchProps = {
  sendMessage: string => void,
  toggleChatPin: () => void
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  sendMessage: (text: string) => dispatch(sendMessage(text)),
  toggleChatPin: () => dispatch({ type: TOGGLE_CHAT_PIN })
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
