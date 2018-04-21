// @flow
import React from 'react'
import styled from 'styled-components'
import Label from '../Label'
import Input from '../Input'
import editable from 'frontend/hoc/editable'

type Props = {
  name: string,
  onChange: Function
}

const Editable = editable(
  styled.div`
    position: relative;
    background: transparent;
    border: none;
    border-radius: 0;
    padding-left: 0;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    color: ${props => props.theme.color};
    margin: 0 0 1rem;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  `
)

const NameInput = Input.extend`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.color};
  margin: 0 0 1rem;
  width: 100%;
  padding: 0;
`

const Name = (props: Props) => {
  return (
    <div>
      <Label>Display Name:</Label>
      <Editable
        isHovering={true}
        value={props.name}
        input={NameInput}
        onChange={props.onChange}
      />
    </div>
  )
}

export default Name
