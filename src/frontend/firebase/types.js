// @flow
import type { MessageResult } from 'common/types'

export interface Ref {
  on(event: string, callback: Function): Ref;
  orderByChild(key: string): Ref;
  limitToLast(length: number): Ref;
  off(): void;
}

export interface SessionSubscription {
  constructor(sessionId: string): void;
  onSessionData(callback: Function): void;
  close(): void;
}

export interface MessagesSubscription {
  constructor(): void;
  onMessageData(callback: Function): void;
  close(): void;
}

/* Messages sent/received by Firebase */
export type FirebaseMessage = {
  from: string,
  result: ?MessageResult,
  text: string,
  timestamp: number
}

// Firebase sessions map from userSessionId => globalSessionId
export type UserSessionsMap = {
  [userSessionId: string]: string
}
export type FirebaseUserData = {
  sessions: UserSessionsMap
}
