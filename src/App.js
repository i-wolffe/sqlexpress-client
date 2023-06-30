import {React, useState} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';
import Login from './views/Login';
import Home from './views/Home';
import Register from './views/Register';

function App() {
  const [user,setUser] = useState({
    name: '',
    email: '',
    access: '',
  })
  const [isLogged,setIsLogged] = useState(false) // car to deretmine what to show on the Login button
  return (
    <div className="App">
      <header className='App-header'>
        <Link to="/" ><h1>Application</h1></Link>
          <LoginButton isLogged={isLogged} />
          <RegisterButton />
      </header>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>} />
          <Route path="/register" element={<Register setUser={setUser} isLogged={isLogged} setIsLogged={setIsLogged}/>} />
          <Route path="/" element={<Home user={user}/>} />
        </Routes>
    </div>
  );
}

export default App;
