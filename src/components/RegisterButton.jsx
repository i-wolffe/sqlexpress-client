import React from 'react'
import {Link} from 'react-router-dom'

const RegisterButton = () => {
  return (
    <div>
      <Link to="/register"><span className="Login-btn">Sign Up</span></Link>
    </div>
  )
}

export default RegisterButton