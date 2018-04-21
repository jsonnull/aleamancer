// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fonts } from 'frontend/styles/common'

const Form = styled.form``

const Input = styled.textarea.attrs({
  type: 'text'
})`
  border: 0;
  height: 50px;
  line-height: 3rem;
  padding: 1rem;
  display: block;
  width: 100%;
  resize: none;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.background};
  border-radius: 5px;
  font-size: ${fontSize.normal};
  font-family: ${fonts.body};
`

type Props = {
  onSend: Function,
  isPinned: boolean
}

type State = {
  value: string,
  height: number
}

const defaultHeight = 50

export default class Compose extends React.Component<Props, State> {
  focused: boolean
  messageQueue: Array<string>
  autogrow: ?HTMLElement

  constructor(props: Props) {
    super(props)

    this.state = {
      value: '',
      height: 0
    }
    this.focused = false
    this.messageQueue = []
  }

  handleChange(event: Object) {
    const value = event.target.value

    const setHeightImmediate = value.length > this.state.value.length

    this.setState({
      value
    })

    if (setHeightImmediate) {
      this.calculateHeight()
    } else {
      this.setState({ height: 0 })
      window.requestAnimationFrame(() => this.calculateHeight())
    }
  }

  calculateHeight() {
    if (!this.autogrow) {
      return
    }

    const autogrow = this.autogrow
    const scrollHeight = autogrow.scrollHeight

    let height = 0
    if (scrollHeight !== defaultHeight) {
      height = scrollHeight
    }

    this.setState({
      height
    })
  }

  handleKeyUp(event: Object) {
    if (event.key == 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    this.messageQueue.push(this.state.value)
    this.props.onSend(this.state.value)
    this.setState({
      value: '',
      height: 0
    })
  }

  render() {
    const { isPinned } = this.props

    const style = {}
    if (this.state.height !== 0) {
      Object.assign(style, { height: this.state.height + 'px' })
    }

    return (
      <Form>
        <Input
          placeholder="Send a message..."
          value={this.state.value}
          innerRef={el => {
            this.autogrow = el
          }}
          style={style}
          isPinned={isPinned}
          onChange={e => this.handleChange(e)}
          onKeyUp={e => this.handleKeyUp(e)}
        />
      </Form>
    )
  }
}
