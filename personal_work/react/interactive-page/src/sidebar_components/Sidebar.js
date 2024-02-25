import React from 'react'
import data from '../data.js'
import ColorButton from './ColorButton.js'
import FakeFormOutput from './FakeFormOutput.js'


export default function Sidebar(props) {
  const sidebarStyle = {
    background: props.pageStyle.taro ?
      data.colors.sidebar.taro :
      data.colors.sidebar.default,
    width: `${props.pageStyle.sidebarWidth}vw`,
  }

  const buttonStyle = {
    background: !props.pageStyle.taro ?
      data.colors.header.taro :
      data.colors.header.default,
    color: !props.pageStyle.taro ?
      "black" :
      "white",
    text: !props.pageStyle.taro ?
      "Pastel?" :
      "Purple?"
  }

  return (
    <div className="sidebar" style={sidebarStyle}>
      <ColorButton toggleColors={props.toggleColors} style={buttonStyle} />
      <p>{props.mainDescription}</p>
      <FakeFormOutput formData={props.formData} retakeForm={props.retakeForm} />
    </div>
  )
}
