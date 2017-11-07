// @flow
import Random from 'random-js'
import type { MessageResult } from 'types'

export default class CommandParser {
  random: Object

  constructor() {
    this.random = new Random(Random.engines.mt19937().autoSeed())
  }

  getMessageResult(text: string): ?MessageResult {
    let result = null

    if (text[0] === '/') {
      result = this.runCommand(text)
    }

    return result
  }

  runCommand(text: string): ?MessageResult {
    let words = text.split(' ')
    let args = words.slice(1).join(' ')

    switch (words[0]) {
      case '/r':
      case '/roll':
        if (args.length > 0) {
          return this.roll(args)
        }
        return null
      default:
        return null
    }
  }

  roll(text: string): MessageResult {
    // Remove extra whitespace
    const args = text.split(' ').join('')

    // Split into a number of rolls
    const rolls = args
      .split('+')
      .join(' +')
      .split('-')
      .join(' -')
      .split(' ')

    // Now we build up the array of results
    const results: MessageResult = []

    rolls.forEach(roll => {
      // Is a die roll like +1d6
      if (roll.indexOf('d') !== -1) {
        // Figure out what the operation for this roll is
        let operation = '+'

        if (roll[0] === '-') {
          operation = '-'
          roll = roll.slice(1)
        } else if (roll[0] === '+') {
          roll = roll.slice(1)
        }

        const [numberOfRolls, dieMax] = roll.split('d').map(Number)

        if (isNaN(numberOfRolls) || isNaN(dieMax)) {
          return
        }

        for (let i = 0; i < numberOfRolls; i++) {
          let result = this.random.integer(1, dieMax)

          results.push({
            die: dieMax,
            result,
            operation
          })
        }

        // Done parsing this roll
        return
      }

      const number = Number(roll)
      // Is a constant
      if (!isNaN(number)) {
        // Just add the constant
        results.push(number)
      }
    })

    return results
  }
}
