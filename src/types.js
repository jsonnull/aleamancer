// @flow

export type Roll =
  | number
  | {
      die: number,
      result: number,
      mod?: 'keep' | 'drop',
      operation: '+' | '-'
    }

export type MessageResult = Array<Roll>

/* Message type */
export type Message = {
  key: string,
  from: string,
  text: string,
  result: ?MessageResult,
  timestamp: number
}

export type SessionMeta = {
  name: string
}

export type SessionInfo = {
  sessionId: string,
  meta?: SessionMeta
}

export type SessionList = {
  [key: string]: SessionInfo
}

export type ThemeName = 'light' | 'dark'

export type Tab = 'Session' | 'Character'
