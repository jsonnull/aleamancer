/* @flow */
import React from 'react'
import type { MessageResult } from 'types'
import styles from './style.css'

type RollsProps = {
  rolls: Array<number>
}
const Rolls = (props: RollsProps) => {
  return <span>
    <i className='fa fa-cube'></i>
    {' '}
    {props.rolls.map((roll, i, arr) => (
      <span key={i}>
        <span className={styles.roll}>
          { roll }
        </span>
        {(i + 1 !== arr.length) ? ' + ' : null}
      </span>
    ))}
  </span>
}

type ModProps = {
  mod: number
}
const Mod = (props: ModProps) => {
  if (props.mod == 0) {
    return null
  }

  return <span>
    {' + '}
    <span className={styles.mod}>{props.mod}</span>
  </span>
}

type Props = {
  result: ?MessageResult
}
const Result = (props: Props) => {
  if (!props.result) {
    return null
  }

  let { mod, rolls, total } = props.result

  return (
    <div className={styles.result}>
      <Rolls rolls={rolls} />
      <Mod mod={mod} />
      {' = '}
      <span className={styles.total}>{total}</span>
    </div>
  )
}

export default Result
