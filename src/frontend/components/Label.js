// @flow
import styled from 'styled-components'
import { fontSize } from 'frontend/styles/common'

const Label = styled.label`
  font-size: ${fontSize.small};
  color: ${props => props.theme.colorSecondary};
  font-weight: ${props => (props.theme.name == 'dark' ? 'normal' : 'bold')};
  display: block;
`

export default Label
