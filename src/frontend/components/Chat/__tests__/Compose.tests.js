// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Compose from '../Compose.js'

describe('Chat Compose component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Compose onSend={() => {}} isPinned={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should handle ENTER event', () => {
    const onSend = sinon.spy()
    const wrapper = mount(<Compose onSend={onSend} isPinned={false} />)
    wrapper.find('textarea').simulate('keyUp', { key: 'Enter' })
    expect(onSend.called).toBe(true)
  })
})
