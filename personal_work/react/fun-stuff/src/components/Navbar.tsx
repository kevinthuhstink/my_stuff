import React from 'react';
import data from '../data.js';
import { NavbarDropdown } from './NavbarDropdown'

export function Navbar(props) {
  const headerIcons = props.title ? data.icons.stinky : data.icons.default;
  const [icon, setIcon] = React.useState(0);
  const cycleIcon = () => setIcon(prevIcon => prevIcon + 1);
  const activeIcon = headerIcons[icon % headerIcons.length]._src

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

  const [dropdown, setDropdown] = React.useState(false);
  const toggleDropdown = () => setDropdown(prevDropdown => !prevDropdown);

  return (
    <header style={headerStyle}>
      <div className="header--left">
        <img className="header--img"
          onClick={cycleIcon}
          src={activeIcon} alt='' />
        <h1 className="header--title" style={textColors}>
          {props.title ?
            "kevinthuhstink" :
            "Kevin Cheng"}
        </h1>
      </div>
      <div className="header--right">
        <p className="header--desc" style={textColors}>Ongoing Project: React Page</p>
        <button className="header--button" onClick={toggleDropdown}>...</button>
        <NavbarDropdown active={dropdown} colors={dropdownColors} selectMainVersion={props.selectMainVersion} />
      </div>
    </header>
  )
}
