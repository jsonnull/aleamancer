// @flow
import { compose } from 'recompose'
import Chat from 'frontend/components/Chat'
import setChatPinned from 'frontend/graphql/mutations/user/setChatPinned'
import sendMessage from 'frontend/graphql/mutations/message/sendMessage'
import { getCurrentUserPreferences } from 'frontend/graphql/queries/currentUser/getCurrentUserPreferences'
import { getGameMessagesByMatch } from 'frontend/graphql/queries/game/getGameMessages'

export default compose(
  getGameMessagesByMatch,
  getCurrentUserPreferences,
  setChatPinned,
  sendMessage
)(Chat)
