import React from 'react'

const Home = (props) => {
  return (
    <div>
      <h2>Home</h2>
      <div className="userContainer">
        {props.user.name === ''
        ?
          null
        :
        <span>Howdy partner {props.user.name}! </span>
      }
      </div>
      <br />
      <div className="general-container">

      </div>
      <div className="action-container">
        <div className="dev-actions">
          <button className="btn">ADD</button>
          <button className="btn">UPDATE</button>
          <button className="btn">DELETE</button>
          <button className="btn">VIEW</button>
        </div>
        <div className="user-actions">
          <button className="btn">BUTTON1</button>
          <button className="btn">BUTTON2</button>
          <button className="btn">BUTTON3</button>
        </div>
        <div className="contenr">
          <img src="" alt="image.png" />
        </div>
      </div>
    </div>
  )
}

export default Home