import {React, useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';

import Login from './views/Login';
import Home from './views/Home';
import Register from './views/Register';
import Modal from './components/Modal';

import PermissionProvider from "./permissionProvider/permissionProvider";
import Restricted from "./permissionProvider/restricted";


function App() {
  const [user,setUser] = useState({
    name: '',
    access: '',
    token: '',
    permissions: []
  })
  const [displayModal,setDisplayModal] = useState(false) // car to deretmine what to show on the Login button
  let logInfo = () => {
    console.log("STATE:",user)
  }
  const updateEnvironment = () => {
    // 
  }
  useEffect(() => {
    console.log(user)
    updateEnvironment(user)
  },[user])
  return (
    <div className="App">
    <PermissionProvider permissions={user.permissions}>
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
        <Route exact path="/login" element={<Login setUser={setUser} />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Home user={user}/>} />
      </Routes>
    </PermissionProvider>
    </div>
  );
}

export default App;
