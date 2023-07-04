import {React, useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';
import Login from './views/Login';
import Home from './views/Home';
import Register from './views/Register';
import Modal from './components/Modal';


function App() {
  const [user,setUser] = useState({
    name: '',
    access: '',
    token: ''
  })
  const [displayModal,setDisplayModal] = useState(false) // car to deretmine what to show on the Login button
  let logInfo = () => {
    console.log("STATE:",user)
  }
  const updateUser = (userObj) => {
    setUser(useState)
  }
  return (
    <div className="App">
      <header className='App-header'>
        <Link to="/" ><h1 onClick={logInfo}>Application</h1></Link>
          <LoginButton user={user} setDisplayModal={setDisplayModal} />
          {user.name === '' ? <RegisterButton /> : null}
          
      </header>
      <Modal displayModal={displayModal} setDisplayModal={setDisplayModal} setUser={setUser}/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home user={user}/>} />
        </Routes>
    </div>
  );
}

export default App;
