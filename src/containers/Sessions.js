// @flow
import React from 'react'
import { connect } from 'react-redux'
import { switchToSession } from 'actions'
import Sessions from '../components/Sessions'
import type { State } from 'store'
import type { SessionList, SessionInfo } from 'types'

/*
 * Current way to type Object.values requires typecast to desired type through `any`
 * See https://github.com/facebook/flow/issues/2174
 * FIXME
 */
function sessionListToArray(sessions: SessionList): Array<SessionInfo> {
  let arr: any = Object.values(sessions)
  arr = (arr: Array<SessionInfo>)
  return arr
}

type StateProps = {
  sessions: Array<SessionInfo>
}
const mapStateToProps = (state: State, ownProps): StateProps => ({
  sessions: sessionListToArray(state.user.data.userSessions),
  ...ownProps
})

type DispatchProps = {
  switchToSession: string => void
}
const mapDispatchToProps = (dispatch: Function) => ({
  switchToSession: (sessionId: string) => dispatch(switchToSession(sessionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sessions)
