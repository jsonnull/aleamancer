// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import slug from 'slugg'
import { changeSidebarTab, switchToSession } from 'frontend/actions'
import Sessions from 'frontend/components/Sessions'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const mapDispatchToProps = dispatch => ({
  switchToSession: (id, name) => {
    dispatch(switchToSession(id))
    dispatch(push(`/g/${slug(name)}/${id}`))
    dispatch(changeSidebarTab('Session'))
  }
})

const sessionsQuery = gql`
  query {
    currentUser {
      games {
        id
        name
      }
    }
  }
`

export default compose(
  connect(undefined, mapDispatchToProps),
  graphql(sessionsQuery)
)(Sessions)
