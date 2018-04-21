// @flow
import React from 'react'
import type { Tab } from 'common/types'
import Session from './Session'

type Props = {
  tab: Tab
}
const Content = (props: Props) => {
  const { tab } = props

  if (tab === 'Session') {
    return <Session />
  }

  return null
}

export default Content
