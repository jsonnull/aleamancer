// @flow
import { connect } from 'react-redux'
import Session from 'frontend/components/Sidebar/Session'
import sessionNameSelector from 'frontend/selectors/sessionName'
import type { State } from 'frontend/store'

type StateProps = { name: string }
const mapStateToProps = (state: State): StateProps => ({
  name: sessionNameSelector(state)
})

export default connect(mapStateToProps)(Session)
