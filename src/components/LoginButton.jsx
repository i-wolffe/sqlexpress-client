import React from 'react'
import {Link} from 'react-router-dom'

const LoginButton = (props) => {
  return (
    <div>
      <Link to="/login"><span className="Login-btn">{ props.isLogged ? 'Log out' : 'Log in' }</span></Link>
    </div>
  )
}

export default LoginButton