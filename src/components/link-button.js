import * as React from 'react'
import { Link } from 'gatsby'

const LinkButton = ({ to, text }) => (
  <Link
    to={to}
    style={{
      border: 1,
      borderRadius: 2,
      padding: 5,
      marginBottom: '1rem',
      textDecoration: 'none',
      backgroundColor: 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: '#32aab7',
        color: 'white',
      },
    }}
  >
    {text}
  </Link>
)

export default LinkButton
