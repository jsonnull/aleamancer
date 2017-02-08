/* @flow */
import Random from 'random-js'
import type { Action } from '../actions/types'

function runCommand (text: string, random: Object) {
  let words = text.split(' ')
  let args = words.slice(1).join(' ')

  switch (words[0]) {
    case '/r':
    case '/roll':
      return roll(args, random)
    default:
      return null
  }
}

function roll (text: string, random: Object) {
  var args = text.split(' ').join('')
  args = args.split('+').join(' + ').split('-').join(' - ').split(' ')

  // Get the random number
  let rands = []
  let modifier = 0
  for(let i = 0; i < args.length; i++) {
    if (args[i].indexOf('d') !== -1) {
      let [num, max] = args[i].split('d').map(n => Number(n))

      for (let j = 0; j < num; j++) {
        let roll = random.integer(1, max)
        roll *= args[i - 1] === '-' ? -1 : 1
        rands.push(roll)
      }
    } else if (!isNaN(args[i])) {      
      if(args[i - 1] === '+') {
        modifier += Number(args[i])
      } else if(args[i - 1] === '-') {
        modifier -= Number(args[i])
      }      
    }
  }

  let total = rands.reduce((a, b) => a + b, 0) + modifier

  let result = {
    'rolls': rands, 
    'mod': modifier,
    'total': total 
  }
  return result
}

const commandParser = (store: Object) => (next: Function) => {
  let random = new Random(Random.engines.mt19937().autoSeed())

  return (action: Action) => {
    if (action.type === 'SEND_MESSAGE') {
      const { text } = action

      if (text[0] !== '/') {
        action.result = null
      } else {
        action.result = runCommand(text, random)
      }
    }

    next(action)
  }
}

export default commandParser
