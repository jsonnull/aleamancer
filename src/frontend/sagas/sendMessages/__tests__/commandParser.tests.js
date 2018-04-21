// @flow
import CommandParser from '../commandParser'

describe('Command parser', () => {
  const commandParser = new CommandParser()

  // Utility function to perform rolls many times
  const performRoll = (roll: string, after: Function, times = 20) => {
    for (let i = 0; i < times; i++) {
      const result = commandParser.getMessageResult(roll)
      after(result)
    }
  }

  it('should not operate if message does not begin with /', () => {
    expect(commandParser.getMessageResult('test')).toBe(null)
  })

  it('should handle /r command', () => {
    performRoll('/r 1d6', rolls => {
      expect(rolls).toHaveLength(1)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
    })
  })

  it('should handle /roll command', () => {
    performRoll('/roll 1d6', rolls => {
      expect(rolls).toHaveLength(1)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
    })
  })

  it('should handle addition with constants', () => {
    performRoll('/r 1d6 + 4', rolls => {
      expect(rolls).toHaveLength(2)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
      expect(rolls[1]).toBe(4)
    })
  })

  it('should handle addition with constants', () => {
    performRoll('/r 1d8 + 4', rolls => {
      expect(rolls).toHaveLength(2)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(8)
      expect(rolls[1]).toBe(4)
    })
  })
  it('should handle addition with constants', () => {
    performRoll('/r 1d8 + 4', rolls => {
      expect(rolls).toHaveLength(2)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(8)
      expect(rolls[1]).toBe(4)
    })
  })

  it('should handle subtraction with constants', () => {
    performRoll('/r 1d12 - 3', rolls => {
      expect(rolls).toHaveLength(2)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(12)
      expect(rolls[1]).toBe(-3)
    })
  })

  it('should handle arbitrary whitespace', () => {
    performRoll('/r 1d6 + 3+2 -  4+ 1d4', rolls => {
      expect(rolls).toHaveLength(5)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
      expect(rolls[1]).toBe(3)
      expect(rolls[2]).toBe(2)
      expect(rolls[3]).toBe(-4)
      expect(rolls[4].result).toBeGreaterThanOrEqual(1)
      expect(rolls[4].result).toBeLessThanOrEqual(4)
    })
  })

  it('should handle multiple die counts', () => {
    performRoll('/r 3d6', rolls => {
      expect(rolls).toHaveLength(3)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
      expect(rolls[1].result).toBeGreaterThanOrEqual(1)
      expect(rolls[1].result).toBeLessThanOrEqual(6)
      expect(rolls[2].result).toBeGreaterThanOrEqual(1)
      expect(rolls[2].result).toBeLessThanOrEqual(6)
    })
  })

  it('should gracefully handle bad die counts', () => {
    performRoll('/r 1d6 + nd4', rolls => {
      expect(rolls).toHaveLength(1)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
    })
  })

  it('should gracefully handle bad die max', () => {
    performRoll('/r 1d6 + 2dr', rolls => {
      expect(rolls).toHaveLength(1)
      expect(rolls[0].result).toBeGreaterThanOrEqual(1)
      expect(rolls[0].result).toBeLessThanOrEqual(6)
    })
  })
})
