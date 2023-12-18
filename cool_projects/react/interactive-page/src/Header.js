import React from 'react';
import data from './data.js';

function Dropdown( props ) {
  const mainVersionCount = 5;
  var mainSelectors = [];
  for ( var mainVer = 0; mainVer < mainVersionCount; mainVer++ ) {
    var mainSelect = props.selectMainVersion.bind( null, mainVer );
    mainSelectors.push( mainSelect );
  }
  return (
    <div className={props.active ? "dropdown active" : "dropdown"} style={props.colors}>
      <h1 className="dropdown--title">Projects:</h1>
      <ol className="dropdown--select">
        <p onClick={mainSelectors[0]}>Current Working Page</p>
        <li onClick={mainSelectors[1]}>CSS Review</li>
        <li onClick={mainSelectors[2]}>Reusable Components</li>
        <li onClick={mainSelectors[3]}>Interactive Components</li>
        <li onClick={mainSelectors[4]}>Game of Life</li>
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
      data.colors.header.taro :
      data.colors.header.default,
  }
  const textColors = {
    color: props.taro ?
      "black" :
      "white",
  }
  const dropdownColors = {
    background: props.taro ?
      data.colors.main.taro :
      data.colors.main.default,
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
        <p className="header--desc" style={textColors}>Ongoing Project: React Page</p>
        <button className="header--button" onClick={toggleDropdown}>...</button>
        <Dropdown active={dropdown} colors={dropdownColors} selectMainVersion={props.selectMainVersion} />
      </div>
    </header>
  )
}
