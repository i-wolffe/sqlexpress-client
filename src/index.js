import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createHashRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

const user = {
  name: '',
  access: '',
  token: '',
  permissions: []
}

const router = createHashRouter([
  {
    path: "/",
    element: <App user={user}/> 
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
