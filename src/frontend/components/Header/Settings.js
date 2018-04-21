// @flow
import React from 'react'
import Button from './Button'

type Props = {
  showSettings: Function
}

const Settings = (props: Props) => {
  const { showSettings } = props

  return (
    <Button square onClick={showSettings}>
      <i className="fa fa-cog" />
    </Button>
  )
}

export default Settings
