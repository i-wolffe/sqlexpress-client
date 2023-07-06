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

const setEnvironment = (user) => {
  console.warn(user)
  localStorage.setItem('user',JSON.stringify(user))
  localStorage.setItem('token',user.token)
  localStorage.setItem('permissions',user.permissions.toString())
}
const getEnvironment = () => {
  let envToken = localStorage.getItem('token') == undefined ? null : localStorage.getItem('token')
  let envUser = localStorage.getItem('user') == undefined ? '{}' : localStorage.getItem('user')
  let envPermissions = localStorage.getItem('permissions') == undefined ? '[]' : localStorage.getItem('permissions')
  return { token: envToken, session: JSON.parse(envUser), permissions: envPermissions }
  // 
}

function App(props) {
  const {token, session, permissions} = getEnvironment()
  const [user,setUser] = useState(
    session === {} ?props.user : session)
  
  const [displayModal,setDisplayModal] = useState(false) // car to deretmine what to show on the Login button
  let logInfo = () => {
    console.log("STATE:",user)
    console.log("token:",token)
    console.log("session:",session)
    console.log("permissions:",permissions)
  }
  let setSession = (newUser) => {
    setUser(newUser)
    setEnvironment(newUser)
  }
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
      <Modal displayModal={displayModal} setDisplayModal={setDisplayModal} setUser={setSession}/>
      <Routes>
        <Route  path="/" element={<Home user={user}/>} />
        <Route  path="/login" element={<Login setUser={setSession} />} />
        <Route  path="/register" element={<Register />} />
      </Routes>
    </PermissionProvider>
    </div>
  );
}

export default App;
