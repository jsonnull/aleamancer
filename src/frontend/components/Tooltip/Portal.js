// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

type Props = {
  isShowing: boolean,
  children?: React.Node
}
class Portal extends React.Component<Props, *> {
  el: HTMLDivElement

  constructor(props: Props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    if (!modalRoot) {
      return
    }
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    if (!modalRoot) {
      return
    }
    modalRoot.removeChild(this.el)
  }

  render() {
    if (this.props.isShowing) {
      return ReactDOM.createPortal(this.props.children, this.el)
    }
    return null
  }
}

export default Portal
