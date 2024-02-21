import React from 'react'
import data from './data.js'

function Colorscheme(props) {
  return (
    <button className="setcolors" onClick={props.toggleColors} style={props.colors}>
      { !props.buttonText ?
        "Pastel?" :
        "Purple?" }
    </button>
  )
}

function FakeFormOut(props) {
  return (
    <div className="fakeform--out">
      <p>Username: {props.formData.username}</p>
      <p>Password: {props.formData.password}</p>
      <button onClick={props.retakeForm}>Retake Form</button>
    </div>
  )
}

export default function Sidebar(props) {
  const sidebarStyle = {
    background: props.pageStyle.taro ?
      data.colors.sidebar.taro :
      data.colors.sidebar.default,
    width: `${props.pageStyle.sidebarWidth}vw`,
  }
  const colors = {
    background: !props.pageStyle.taro ?
      data.colors.header.taro :
      data.colors.header.default,
    color: !props.pageStyle.taro ?
      "black" :
      "white"
  }

  return (
    <div className="sidebar" style={sidebarStyle}>
      <Colorscheme toggleColors={props.toggleColors} colors={colors} buttonText={props.pageStyle.taro} />
      <p>{props.displayText}</p>
      <FakeFormOut formData={props.formData} retakeForm={props.retakeForm} />
    </div>
  )
}
