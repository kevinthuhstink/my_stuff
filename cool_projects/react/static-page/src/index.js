import React from 'react';
import Navbar from './components/Navbar.js'
import Main from './components/Main.js'
import Sidebar from './components/Sidebar.js'
import './styles.css'
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Sidebar />
    <Main />
  </React.StrictMode>
);
