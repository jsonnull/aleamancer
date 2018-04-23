// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import slug from 'slugg'
import { changeSidebarTab, switchToSession } from 'frontend/actions'
import Sessions from 'frontend/components/Sessions'
import { getCurrentUserGames } from 'frontend/graphql/queries/currentUser/getCurrentUserGames'

const mapDispatchToProps = dispatch => ({
  switchToSession: (id, name) => {
    dispatch(switchToSession(id))
    dispatch(push(`/g/${slug(name)}/${id}`))
    dispatch(changeSidebarTab('Session'))
  }
})

export default compose(
  connect(undefined, mapDispatchToProps),
  getCurrentUserGames
)(Sessions)
