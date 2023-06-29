import React from 'react'
import {Link} from 'react-router-dom'

const LoginButton = () => {
  return (
    <div>
      <Link to="/login"><span className="Login-btn">Login</span></Link>
    </div>
  )
}

export default LoginButton