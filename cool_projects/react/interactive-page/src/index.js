import React from 'react';
import Sidebar from './Sidebar.js';
import Form from './Form.js'
import ReactDOM from 'react-dom/client';
import './styles.css';
import _icons from './data.js'


function Header( props ) {

  const _imgs = _icons.icons;
  //instance of an incrementer "class"
  /*
  const inc = ( function() {
    let num = 0;
    //cycle num mod len
    return () => ++num % _imgs.length;
  } )(); */

  //the incrementer "class" is mad unreliable
  const [ icon, setIcon ] = React.useState( 0 ); 
  function cycleIcon() {
    setIcon( num => num + 1 ); 
  }

  const styles = {
    background: props.taro ?
      "linear-gradient( 30deg, #b3baff 40%, #333399 100% )" :
      "linear-gradient( 120deg, indigo 40%, navy 100% )",
  }
  //colors is used for subdivs
  const colors = {
    color: props.taro ?
      "black" :
      "white",
  }

  return (
    <header style={styles}>
      <img className="header--img"
           onClick={cycleIcon}
           src={ _imgs[ icon % _imgs.length ]._src } alt='' />
      <h1 className="header--title" style={colors}>kevinthuhstink</h1>
      <p className="header--desc" style={colors}>React Project 3: My first interactive web site</p>
    </header>
  )
}

function Main( props ) {
  const styles = {
    background: props.taro ?
      "linear-gradient( 120deg, #e6eaff 30%, white 100% )" :
      "linear-gradient( 120deg, Lavender, LavenderBlush )",
  }
  const colors = { //colors prop can be sent down multiple layers
    background: props.taro ?
      "linear-gradient( 30deg, #b3baff 40%, #333399 100% )" :
      "linear-gradient( 120deg, indigo 40%, navy 100% )",
  }
  const textColors = {
    color: props.taro ?
      "black" :
      "white"
  }


  return (
    <main style={styles}>
      <h1 className="main--title">Generate "Wall" Of Text</h1>
      <Form colors={colors} textColors={textColors} />
    </main>
  )
}

function Page( props ) {
  //taro can be toggled on or off
  const [ taro, setTaro ] = React.useState( false );
  function colorsToggle() {
    setTaro( prev => !prev );
  }

  //apply that toggle onto the colorschemes
  var sections = [
    <Header taro={taro} />,
    <Main taro={taro} />,
    <Sidebar taro={taro} colorsToggle={colorsToggle} /> //send toggler to colorscheme button
  ];

  return (
    <div className="page">
      {sections}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
