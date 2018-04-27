// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { changeSidebarTab } from 'frontend/actions'
import Sidebar from 'frontend/components/Sidebar'
import sessionIdSelector from 'frontend/selectors/sessionId'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import type { State } from 'frontend/store'

const mapStateToProps = (state: State) => ({
  sessionId: sessionIdSelector(state),
  open: state.sidebar.open,
  tab: state.sidebar.tab
})

const mapDispatchToProps = {
  changeTab: changeSidebarTab
}

const currentSession = gql`
  query sessionName($id: ID!) {
    game(id: $id) {
      name
    }
  }
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(currentSession, {
    name: 'currentSession',
    options: ownProps => ({
      variables: {
        id: ownProps.sessionId
      }
    })
  })
)(Sidebar)
