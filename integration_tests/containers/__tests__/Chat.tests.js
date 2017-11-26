// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter } from 'react-router-redux'
import { sendMessage, receiveMessage } from '../../../src/actions'
import setupStore, { history, dispatchSpy } from '../../setupStore'
import Chat from '../../../src/containers/Chat'

describe('Chat container', () => {
  const store = setupStore()
  const message = {
    id: 'unique',
    from: 'test1',
    text: 'messageText',
    timestamp: 0,
    result: undefined
  }
  store.dispatch(receiveMessage(message))

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Chat />
      </ConnectedRouter>
    </Provider>
  )

  it('should show messages', () => {
    expect(wrapper.find('MessageView')).toHaveLength(1)
    expect(wrapper.text()).toContain('messageText')
  })

  it('should allow user to toggle pin state', () => {
    expect(store.getState().user.preferences.chatPinned).toBe(false)
    wrapper.find('i.fa-thumb-tack').simulate('click')
    expect(store.getState().user.preferences.chatPinned).toBe(true)
  })

  it('should allow the user to send messages', () => {
    wrapper
      .find('textarea')
      .simulate('change', { target: { value: 'Test message' } })
      .simulate('keyUp', { key: 'Enter' })
    expect(dispatchSpy.calledWith(sendMessage('Test message'))).toBe(true)
  })
})
