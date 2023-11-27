import React from 'react';
import data from './data.js';

/* dropdown TODO:
 *  mouse over w/ underline and load previous versions
 *  hide sidebar
 *  bubble-opening animation
 *  resizable sidebar
 *    no thinner than 18vw
 */
function Dropdown( props ) {
  return (
    <div className={props.active ? "dropdown active" : "dropdown"} style={props.colors}>
      <h1 className="dropdown--title">Projects:</h1>
      <ol className="dropdown--options">
        <li>CSS Review</li>
        <li>Reusable Components</li>
        <li>Interactive Components</li>
      </ol>
    </div>
  )
}

export default function Header( props ) {
  const _imgs = data.icons;
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

  const headerStyle = {
    background: props.taro ?
      props.colors.taroHeaderBackground :
      props.colors.defaultHeaderBackground,
  }
  const textColors = {
    color: props.taro ?
      "black" :
      "white",
  }
  const dropdownColors = {
    background: props.taro ?
      props.colors.taroMainBackground :
      props.colors.defaultMainBackground,
  }

  const [ dropdown, setDropdown ] = React.useState( false );
  function toggleDropdown() {
    setDropdown( _toggle => !_toggle );
  }

  return (
    <header style={headerStyle}>
      <div className="header--left">
        <img className="header--img"
          onClick={cycleIcon}
          src={ _imgs[ icon % _imgs.length ]._src } alt='' />
        <h1 className="header--title" style={textColors}>
          { props.title ?
            "kevinthuhstink" :
            "Kevin Cheng" }
        </h1>
      </div>
      <div className="header--right">
        <p className="header--desc" style={textColors}>React Project 3: My first interactive web site</p>
        <button className="header--button" onClick={toggleDropdown}>...</button>
        <Dropdown active={dropdown} colors={dropdownColors} />
      </div>
    </header>
  )
}
