/* @flow */
import React from 'react'
import type { SessionInfo } from 'types'
import styles from './style.css'

const Meta = (props: { isCurrent: boolean }) => {
  if (props.isCurrent) {
    return <div className={styles.tag}>Current</div>
  }

  return null
}

const Loading = () => (
  <div>
    <i className={`fa fa-circle-o-notch fa-spin fa-fw ${styles.waitingIcon}`}></i>
    {' '}
    <span>Retrieving game info...</span>
  </div>
)

type Props = {
  isCurrent: boolean,
  session: SessionInfo,
  setSession: Function
}

const Item = (props: Props) => {
  let currentStyle = props.isCurrent ? ' ' + styles.current : ''

  const content = (!props.session.meta)
    ? <Loading />
    : <div>
      <div className={styles.name}>
        {props.session.meta.name}
      </div>
      <Meta isCurrent={props.isCurrent}/>
    </div>

  return (
    <div
      className={styles.session + currentStyle}
      onClick={() => {
        props.setSession(props.session.sessionId)
      }}
    >
      { content }
    </div>
  )
}

export default Item