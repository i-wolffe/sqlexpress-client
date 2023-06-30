import React from 'react'

const Home = (props) => {
  return (
    <div>
      <h2>Home</h2>
      <div className="userContainer">
        {props.user.name === ''
        ?
        <span>Please log in to see your information</span>
        :
        <span>Hi user: {props.user.name}</span>
      }
      </div>
    </div>
  )
}

export default Home