import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import Signup from './components/SignUp';
import Login from './components/Login';
import About from './components/About';
import HeadAndTail from './components/HeadAndTail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Signup /> */}
    {/* <Login /> */}
    {/* <About /> */}
    {/* <HeadAndTail /> */}
    {/* <Home/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
