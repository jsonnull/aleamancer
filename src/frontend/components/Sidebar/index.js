// @flow
import React from 'react'
import styled from 'styled-components'
import Content from 'frontend/containers/Sidebar/Content'
import type { Tab } from 'common/types'
import { colors, fontSize, fonts } from 'frontend/styles/common'
import Menu from './Menu'

const Container = styled.div`
  background-color: ${props => props.theme.background};
  width: 300px;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  background: ${colors.lightGray};
`

const Header = styled.h1`
  font-family: ${fonts.heading};
  font-size: ${fontSize.large};
  line-height: 1;
  padding: 1rem 1rem 0;
  color: ${props => props.theme.color};
  margin: 0;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

type Props = {
  name: string,
  open: boolean,
  tab: Tab,
  changeTab: Function
}

class Sidebar extends React.Component<Props> {
  render() {
    const { name, tab, changeTab } = this.props
    return (
      <Container>
        <Top>
          <Header>{name}</Header>
          <Menu tab={tab} changeTab={changeTab} />
        </Top>
        <ContentContainer>
          <Content tab={tab} />
        </ContentContainer>
      </Container>
    )
  }
}

export default Sidebar
