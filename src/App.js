import './App.css';
import { React, useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginButton from './components/LoginButton';

import RegisterButton from './components/RegisterButton';
import Modal from './components/Modal';

import Login from './views/Login';
import Home from './views/Home';
import Register from './views/Register';

import PermissionProvider from "./permissionProvider/permissionProvider";
import Restricted from "./permissionProvider/restricted";


function App(props) {
  const [user,setUser] = useState(
    props.user)
  const [displayModal,setDisplayModal] = useState(false) // car to deretmine what to show on the Login button
  let logInfo = () => {
    console.log("STATE:",user)
  }
  const updateEnvironment = () => {
    // 
  }
  useEffect(() => {
    console.warn(user)
    // updateEnvironment(user)
  },[user])
  return (
      <div className="App">
    <PermissionProvider permissions={ user !== undefined ? user.permissions : []}>
      <header className='App-header'>
        <Link to="/" ><h1 onClick={logInfo}>Application</h1></Link>
          <LoginButton user={user} setDisplayModal={setDisplayModal} />
          {/* {user.name === '' ? <RegisterButton /> : null} */}
          <Restricted to="element.add">
            <RegisterButton />
          </Restricted>
          
      </header>
      <Modal displayModal={displayModal} setDisplayModal={setDisplayModal} setUser={setUser}/>
      <Routes>
        <Route  path="/" element={<Home user={user}/>} />
        <Route  path="/login" element={<Login setUser={setUser} />} />
        <Route  path="/register" element={<Register />} />
      </Routes>
    </PermissionProvider>
    </div>
  );
}

export default App;
