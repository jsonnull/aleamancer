// @flow
import React from 'react'
import Button from 'frontend/components/Button'

type Props = {
  createSession: Function
}

const CreateButton = Button.extend`
  display: block;
  flex: 0;
  margin-bottom: auto;
  margin-right: auto;
`

const Create = (props: Props) => {
  return <CreateButton onClick={props.createSession}>Create Game</CreateButton>
}

export default Create
