// @flow
import React from 'react'
import Transition from 'react-transition-group/Transition'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { timings } from 'frontend/styles/common'

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited'

const transitionFromState = (state: TransitionState, transitions: Object) => {
  if (transitions[state]) {
    return transitions[state]
  }

  return transitions.default
}

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${props => props.theme.modalOverlay};
  opacity: ${props =>
    transitionFromState(props.state, {
      entering: '1',
      entered: '1',
      exiting: '0',
      exited: '0'
    })};
  transition: opacity 0.2s;
  transition-timing-function: ${timings.easeOutQuad};
  transform: ${props =>
    props.state === 'exited' ? 'translateX(-100000px)' : 'none'};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.modalBackground};
  transform: ${props =>
    transitionFromState(props.state, {
      entering: 'scale(1)',
      entered: 'scale(1)',
      exiting: 'scale(0.7)',
      exited: 'scale(0.7)'
    })};
  transition: transform 0.2s;
  transition-timing-function: ${timings.easeOutQuad};
`

type ContentProps = {
  dismiss: Function,
  state: TransitionState,
  children: Function
}
class Content extends React.Component<ContentProps> {
  handleClickOutside = () => {
    const state = this.props.state

    // Only call the dismiss function if we're currently showing
    if (state == 'entering' || state == 'entered') {
      this.props.dismiss()
    }
  }

  render() {
    return <Wrapper state={this.props.state}>{this.props.children()}</Wrapper>
  }
}

const ContentWithClick = onClickOutside(Content)

type ModalProps = {
  show: boolean,
  dismiss: Function,
  children: Function
}
const Modal = (props: ModalProps) => {
  const { show, ...restProps } = props

  return (
    <Transition in={show} timeout={{ enter: 200, exit: 200 }}>
      {(state: TransitionState) => (
        <Background state={state}>
          <ContentWithClick state={state} {...restProps} />
        </Background>
      )}
    </Transition>
  )
}

export default Modal
