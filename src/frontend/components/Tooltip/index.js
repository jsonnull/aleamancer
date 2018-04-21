// @flow
import * as React from 'react'
import styled from 'styled-components'
import { Arrow, Manager, Popper, Target } from 'react-popper'
import { fontSize } from 'frontend/styles/common'
import Portal from './Portal'

const TooltipDiv = styled.div`
  color: white;
  background: black;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: ${fontSize.small};
`

const ArrowDiv = styled.div`
  background: black;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  position: absolute;
  ${props => (props.placement == 'bottom' ? 'top: -4px' : '')};
  ${props => (props.placement == 'top' ? 'bottom: -4px' : '')};
  ${props => (props.placement == 'right' ? 'left: -4px' : '')};
  ${props => (props.placement == 'left' ? 'right: -4px' : '')};
`

type Props = {
  placement: 'top' | 'right' | 'bottom' | 'left',
  offset?: number,
  content: string,
  children?: React.Node
}
type State = {
  isShowing: boolean
}
class Tooltip extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { isShowing: false }
  }

  onMouseOver = () => {
    this.setState({ isShowing: true })
  }

  onMouseOut = () => {
    this.setState({ isShowing: false })
  }

  render() {
    const { placement, content } = this.props
    const { isShowing } = this.state

    return (
      <div onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
        <Manager tag={false}>
          <Target>
            {({ targetProps }) => (
              <div {...targetProps}>{this.props.children}</div>
            )}
          </Target>
          <Portal isShowing={isShowing}>
            <Popper placement={placement}>
              {({ popperProps }) => (
                <TooltipDiv
                  innerRef={popperProps.ref}
                  style={popperProps.style}
                >
                  {content}
                  <Arrow>
                    {({ arrowProps }) => (
                      <ArrowDiv
                        placement={placement}
                        innerRef={arrowProps.ref}
                        style={arrowProps.style}
                      />
                    )}
                  </Arrow>
                </TooltipDiv>
              )}
            </Popper>
          </Portal>
        </Manager>
      </div>
    )
  }
}

export default Tooltip
