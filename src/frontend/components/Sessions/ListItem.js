// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fonts } from 'frontend/styles/common'

const SessionName = styled.div`
  font-family: ${fonts.heading};
  font-size: ${fontSize.medium};
`

const Session = styled.div`
  padding: 1rem;
  border-radius: 5px;
  margin: 0 1rem 2rem;
  flex: 1 0 25%;
  max-width: 25%;
  min-height: 100px;
  cursor: pointer;
  background-color: ${props => props.theme.backgroundSecondary};
`

type Props = {
  name: string,
  setSession: Function
}

const Item = (props: Props) => {
  return (
    <Session onClick={props.setSession}>
      <SessionName>{props.name}</SessionName>
    </Session>
  )
}

export default Item
