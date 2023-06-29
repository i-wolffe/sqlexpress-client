import {React} from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import LoginButton from './components/LoginButton';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <Link to="/" ><h1>Application</h1></Link>
          <LoginButton />

      </header>
        <Routes>
          <Route path="/login" element={<Login token={false}/>} />
          <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
