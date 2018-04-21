// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Modal from 'frontend/components/Modal'

describe('Modal component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Modal show={true} dismiss={() => {}}>
          {() => {}}
        </Modal>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when not set to show', () => {
    const tree = renderer
      .create(
        <Modal show={false} dismiss={() => {}}>
          {() => {}}
        </Modal>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
