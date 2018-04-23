// @flow
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${props => props.theme.background};
  width: 320px;
  overflow: hidden;
  border-radius: ${props => (props.isPinned ? '0' : '5px')};
  box-shadow: ${props =>
    props.isPinned ? '' : '0 3px 5px 0 rgba(0, 0, 0, 0.2)'};

  height: ${props => (props.isPinned ? '100%' : 'auto')};
  position: ${props => (props.isPinned ? 'relative' : 'absolute')};
  top: ${props => (props.isPinned ? '0' : 'auto')};
  right: ${props => (props.isPinned ? '0' : '1rem')};
  bottom: ${props => (props.isPinned ? '0' : '1rem')};

  display: flex;
  flex-direction: column;
`

export const Loading = styled.div`
  padding: 10px;
`

export const Error = Loading
