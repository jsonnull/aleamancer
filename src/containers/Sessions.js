// @flow
import { connect } from 'react-redux'
import { switchToSession } from 'actions'
import Sessions from '../components/Sessions'
import type { State } from 'store'
import type { SessionInfo } from 'types'

type StateProps = {
  sessions: Array<SessionInfo>
}
const mapStateToProps = (state: State, ownProps): StateProps => ({
  sessions: state.user.data.sessions,
  ...ownProps
})

type DispatchProps = {
  switchToSession: string => void
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  switchToSession: (sessionId: string) => dispatch(switchToSession(sessionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sessions)
