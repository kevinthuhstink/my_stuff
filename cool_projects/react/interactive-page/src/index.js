import React from 'react';
import Sidebar from './Sidebar.js';
import Form from './Form.js'
import ReactDOM from 'react-dom/client';
import './index.css';
import _icons from './data.js'

const _imgs = _icons.icons;
const inc = ( function() {
  let num = 0;
  //checks if num is the last in the _imgs list
  return () => ++num % _imgs.length;
})();

function Header() {
  //React state
  const [ iconIndex, setIconIndex ] = React.useState( _imgs[0]._src ); 
  console.log( _imgs.length );
  //instance of an incrementer "class"

  function cycleIcon() {
    setIconIndex( _imgs[ inc() ]._src ); //grab its num
  }

  return (
    <header>
      <img className="header--img" onClick={cycleIcon} src={iconIndex} alt='' />
      <h1 className="header--title">kevinthuhstink</h1>
      <p className="header--desc">React Project 3: My first interactive web site</p>
    </header>
  )
}

function Main() {
  return (
    <main>
      <Sidebar />
      <h1 className="main--title">Generate "Wall" Of Text</h1>
      <Form />
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
);
