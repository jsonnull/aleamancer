// @flow
import React from 'react'
import { fontSize } from 'frontend/styles/common'
import Button from './Button'

const SmallButton = Button.extend`
  font-size: ${fontSize.small};
`

type Props = {
  username: string
}

const CurrentUser = (props: Props) => {
  return <SmallButton>{props.username}</SmallButton>
}

export default CurrentUser
