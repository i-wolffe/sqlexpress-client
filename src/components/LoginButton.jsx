import React from 'react'
import {Link} from 'react-router-dom'

const LoginButton = (props) => {
  let logOut = (e) => {
    console.log('remove token from:',props.user)
  }
  return (
    props.user.name !== ''
    ? 
      <div>
        <span className="Login-btn" onClick={logOut}>Log out</span>
      </div>
    : 
      <div>
        <Link to="/login"><span className="Login-btn">Log in</span></Link>
      </div>
  )
}

export default LoginButton