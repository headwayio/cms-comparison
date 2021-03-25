import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './link-button.css'

const LinkButton = ({ to, text }) => (
  <Link to={to} className="linkbutton">
    {text}
  </Link>
)

export default LinkButton
