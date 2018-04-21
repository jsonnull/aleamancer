// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore, dispatchSpy } from '../../appContainer'
import { sendMessage, receiveMessage } from 'frontend/actions'
import Chat from 'frontend/containers/Chat'

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
    <App store={store}>
      <Chat />
    </App>
  )

  it('should show messages', () => {
    expect(wrapper.find('MessageView')).toHaveLength(1)
    expect(wrapper.text()).toContain('messageText')
  })

  it('should allow user to toggle pin state', () => {
    expect(store.getState().preferences.chatPinned).toBe(false)
    wrapper.find('i.fa-thumb-tack').simulate('click')
    expect(store.getState().preferences.chatPinned).toBe(true)
  })

  it('should allow the user to send messages', () => {
    wrapper
      .find('textarea')
      .simulate('change', { target: { value: 'Test message' } })
      .simulate('keyUp', { key: 'Enter' })
    expect(dispatchSpy.calledWith(sendMessage('Test message'))).toBe(true)
  })
})
