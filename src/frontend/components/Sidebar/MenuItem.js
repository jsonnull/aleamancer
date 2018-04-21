// @flow
import React from 'react'
import styled from 'styled-components'
import { colors } from 'frontend/styles/common'
import Tooltip from '../Tooltip'

const Item = styled.div`
  text-align: center;
  height: 4.8rem;
  width: 4.8rem;
  line-height: 4.8rem;
  background-repeat: no-repeat;
  background-size: ${props => (props.selected ? '100% 4px' : '0 4px')};
  background-position: ${props => (props.selected ? '0 4.4rem' : '50% 4.4rem')};
  background-image: linear-gradient(black 0%, black 100%);
  transition: background-size 100ms, background-position 100ms;

  &:hover {
    background-color: ${props =>
      props.theme.name === 'dark'
        ? props.theme.backgroundSecondary
        : colors.lightBlue};
    color: white;
    cursor: pointer;
  }
`

type Props = {
  name: string,
  icon: string,
  selected: boolean,
  action: Function
}

const MenuItem = (props: Props) => {
  const { name, icon, selected, action } = props

  return (
    <Tooltip content={name} placement="bottom">
      <Item selected={selected} onClick={() => action(name)}>
        <i className={`fa ${icon}`} />
      </Item>
    </Tooltip>
  )
}

export default MenuItem
