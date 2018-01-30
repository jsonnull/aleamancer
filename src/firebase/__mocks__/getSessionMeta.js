// @flow

const loadSessionMeta = (sessionId: string): Promise<Object> =>
  new Promise((resolve, reject) => {
    const mockData = { name: 'test' }
    resolve(mockData)
  })

export default loadSessionMeta
