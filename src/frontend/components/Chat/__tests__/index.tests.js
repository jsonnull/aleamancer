// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Chat from '../index.js'

describe('Chat component', () => {
  it('renders correctly', () => {
    const currentUserWithPreferences = {
      loading: false,
      error: undefined,
      currentUser: {
        preferences: {
          chatPinned: false,
          theme: 'light'
        }
      }
    }

    const gameWithMessages = {
      loading: false,
      error: undefined,
      game: {
        messageConnection: {
          edges: []
        }
      }
    }

    const tree = renderer
      .create(
        <Chat
          gameWithMessages={gameWithMessages}
          currentUserWithPreferences={currentUserWithPreferences}
          setChatPinned={() => {}}
          subscribeToNewMessages={() => {}}
          sendMessage={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
