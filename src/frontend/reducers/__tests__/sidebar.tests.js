// @flow
import reduce from '../sidebar'
import { changeSidebarTab } from 'frontend/actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  tab: 'Session'
}

describe('sidebar reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle CHANGE_SIDEBAR_TAB', () => {
    expect(reduce(undefined, changeSidebarTab('Character'))).toEqual({
      ...DEFAULT_STATE,
      tab: 'Character'
    })
  })
})
