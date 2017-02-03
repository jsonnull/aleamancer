import React from 'react'
import { connect } from 'react-redux'
// import {
  // sendMessage,
  // toggleChatPin
// } from '../../actions'
import styles from './style.css'

class Map extends React.Component {
  render () {
    const { sidebar, chat } = this.props

    let left = (sidebar && chat) ? '600px'
      :(!sidebar && !chat)? '0'
      : '300px'
    let style = {
      right: (false)? '300px' : '0',
      left
    }

    return (
      <div className={ styles.map } style={style}>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({
    sidebar: state.sidebar.open,
    chat: state.preferences.chatPinned
  }, ownProps)
}

// const mapDispatchToProps = (dispatch) => {
  // return {
    // sendMessage: (message) => { dispatch(sendMessage(message)) },
    // togglePinned: () => dispatch(toggleChatPin())
  // }
// }

export default connect(mapStateToProps)(Map)
