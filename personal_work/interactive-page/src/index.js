import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import Page from './Page.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Page />
)
/* 
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
); */
