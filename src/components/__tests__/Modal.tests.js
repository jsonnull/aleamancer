// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Modal from '../Modal'

describe('Modal component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Modal dismiss={() => {}}>{() => {}}</Modal>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when no background option is set', () => {
    const tree = renderer
      .create(
        <Modal noBackground dismiss={() => {}}>
          {() => {}}
        </Modal>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
