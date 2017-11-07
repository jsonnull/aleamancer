// @flow
import reduce from '../session'
import { hydrateSession } from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  name: ''
}

describe('session reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle HYDRATE_SESSION', () => {
    expect(
      reduce(undefined, hydrateSession({ name: 'test', field: 'testField' }))
    ).toEqual({
      name: 'test',
      field: 'testField'
    })
  })
})
