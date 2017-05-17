/* @flow */
import React from 'react'
import type { MessageResult, Roll } from 'types'
import styles from './style.css'

type RollProps = {
  result: number,
  operation: '+' | '-',
  color?: 'inherit' | 'green' | 'red',
  showOperation?: boolean
}
const Result = (props: RollProps) => {
  const { result, operation, color = 'inherit', showOperation = true } = props

  const shownOperation = showOperation ? ` ${operation} ` : ''

  return <span>
    { shownOperation }
    <span className={styles.roll} style={{color}}>
      { result }
    </span>
  </span>
}

type RollContainerProps = {
  roll: Roll | number,
  isFirst: boolean
}
const RollContainer = (props: RollContainerProps) => {
  const { roll, isFirst } = props

  // Handle the general case where the roll is a constant
  if (typeof roll === 'number') {
    return <Result result={roll} operation='+' showOperation={!isFirst} />
  }

  const { die, result, operation } = roll

  let color = 'inherit'
  if (result === die) {
    color = 'green'
  } else if (result === 1) {
    color = 'red'
  }

  return <Result result={result} color={color} operation={operation} showOperation={!isFirst} />
}

type Props = {
  result: ?MessageResult
}
const Results = (props: Props) => {
  if (!props.result) {
    return null
  }

  const results = props.result
  const total = results.reduce((acc, roll) => {
    if (typeof roll === 'number') {
      return acc + roll
    } else {
      return acc + roll.result
    }
  }, 0)

  return (
    <div className={styles.result}>
      <i className='fa fa-cube'></i>
      {' '}
      {results.map((result, i, arr) => (
        <span key={i}>
          <RollContainer roll={result} isFirst={i === 0}/>
        </span>
      ))}
      {' = '}
      <span className={styles.total}>
        {total}
      </span>
    </div>
  )
}

export default Results
