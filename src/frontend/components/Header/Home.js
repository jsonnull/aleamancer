// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip'
import Button from './Button'

const Home = () => (
  <Tooltip placement="right" content="Home">
    <Link to="/sessions">
      <Button square>
        <i className="fa fa-home" />
      </Button>
    </Link>
  </Tooltip>
)

export default Home
