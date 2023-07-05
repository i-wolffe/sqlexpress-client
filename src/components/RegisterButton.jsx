import React from 'react'
import {Link} from 'react-router-dom'

const RegisterButton = () => {
  return (
    <div>
      <Link to="/register"><span className="Login-btn">Add User</span></Link>
    </div>
  )
}

export default RegisterButton