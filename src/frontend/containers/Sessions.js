// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { switchToSession } from 'frontend/actions'
import Sessions from 'frontend/components/Sessions'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

type DispatchProps = {
  switchToSession: string => void
}
const mapDispatchToProps = {
  switchToSession
}

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
