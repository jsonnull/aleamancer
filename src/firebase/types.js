// @flow
export interface Ref {
  on(event: string, callback: Function): Ref,
  off(): void
}

export interface SessionSubscription {
  constructor(sessionId: string): void,
  onSessionData(callback: Function): void,
  close(): void
}
