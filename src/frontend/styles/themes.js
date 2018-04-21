// @flow
import type { ThemeName } from 'common/types'
import { colors } from './common'

export type Theme = {
  name: ThemeName,
  background: string,
  backgroundSecondary: string,
  backgroundInverted: string,
  backgroundInvertedSecondary: string,
  color: string,
  colorSecondary: string,
  colorMedium: string,
  colorInverted: string,
  map: string,
  borderColor: string,
  modalOverlay: string,
  modalBackground: string
}

export const light: Theme = {
  name: 'light',
  background: '#f7f7f7',
  backgroundSecondary: '#ebe3d6',
  backgroundInverted: '#3c3c3c',
  backgroundInvertedSecondary: '#555',
  color: 'black',
  colorSecondary: '#3c3c3c',
  colorMedium: '#999',
  colorInverted: '#f7f7f7',
  map: '#bfbca5',
  borderColor: '#cdc5ba',
  modalBackground: '#f7f7f7',
  modalOverlay: 'rgba(0, 0, 0, 0.5)'
}

export const dark: Theme = {
  name: 'dark',
  background: '#3c3c3c',
  backgroundSecondary: '#2b2b2b',
  backgroundInverted: colors.blue,
  backgroundInvertedSecondary: colors.lightBlue,
  color: '#eee',
  colorSecondary: '#cdc5ba',
  colorMedium: '#999',
  colorInverted: '#eee',
  map: '#1a1a1a',
  borderColor: '#1a1a1a',
  modalBackground: '#2b2b2b',
  modalOverlay: 'rgba(0, 0, 0, 0.7)'
}
