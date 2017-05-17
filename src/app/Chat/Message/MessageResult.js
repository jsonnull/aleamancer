/* @flow */
import React from 'react'
import type { MessageResult } from 'types'
import styles from './style.css'

type RollsProps = {
  roll: Object<any>
}
const Roll = (props: RollsProps) => {
  const { die, result, mod, operation } = props.roll
  let resultColor = 'inherit'
  if (result === die) {
    resultColor = 'green'
  } else if (result === 1) {
    resultColor = 'red'
  }
  return <span>

    {' '}
    <span className={styles.roll} style={{color: resultColor}}>
      { result }
    </span>
  </span>
}

type Props = {
  result: ?MessageResult
}
const Result = (props: Props) => {
  if (!props.result) {
    return null
  }

  const results = props.result
  let total

  return (
    <div className={styles.result}>
      <i className='fa fa-cube'></i>
      {results.map((result, i, arr) => (
        <span key={i}>
          <Roll roll={result} />
          {(i + 1 !== arr.length) ? ` ${result.operation} ` : null}
        </span>
      ))}
      {' = '}
      <span className={styles.total}></span>
    </div>
  )
}

export default Result
