// @flow
import { connect } from 'react-redux'
import { changeSidebarTab } from 'frontend/actions'
import Sidebar from 'frontend/components/Sidebar'
import sessionNameSelector from 'frontend/selectors/sessionName'
import type { State } from 'frontend/store'
import type { Tab } from 'common/types'

type StateProps = {
  name: string,
  open: boolean,
  tab: Tab
}
const mapStateToProps = (state: State): StateProps => {
  return {
    name: sessionNameSelector(state),
    open: state.sidebar.open,
    tab: state.sidebar.tab
  }
}

type DispatchProps = {
  changeTab: Function
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => {
  return {
    changeTab: tab => dispatch(changeSidebarTab(tab))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
