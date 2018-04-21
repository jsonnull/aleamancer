// @flow
const mockData = { name: 'test' }

const loadSessionMeta = (_sessionId: string): Promise<Object> =>
  new Promise(resolve => {
    resolve(mockData)
  })

export default loadSessionMeta
