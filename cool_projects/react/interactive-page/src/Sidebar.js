import React from 'react'
import Cardbar from './Cardbar.js'
import TodoList from './TodoList.js'
import data from './data.js'

function Colorscheme( props ) {
  return (
    <button className="setcolors" onClick={props.toggleColors} style={props.colors}>
      { !props.buttonText ?
        "Pastel?" :
        "Purple?" }
    </button>
  )
}

function FakeFormOut( props ) {
  return (
    <div className="fakeform--out">
      <p>Username: {props.formData.username}</p>
      <p>Password: {props.formData.password}</p>
      <button onClick={props.retakeForm}>Retake Form</button>
    </div>
  )
}

export default function Sidebar( props ) {
  const sidebarStyle = {
    background: props.pageStyle.taro ?
      data.colors.taroSidebarBackground :
      data.colors.defaultSidebarBackground,
    width: `${props.pageStyle.sidebarWidth}vw`,
  }
  const colors = {
    background: !props.pageStyle.taro ?
      data.colors.taroHeaderBackground :
      data.colors.defaultHeaderBackground,
    color: !props.pageStyle.taro ?
      "black" :
      "white"
  }
  /* inaccurate to have derived states from props
  const [ bg, setBg ] = React.useState( props.color );
  function bgToggle() {
    setColor( bg => !bg );
  } */

  return (
    <div className="sidebar" style={sidebarStyle}>
      <small className="proj">Project 1</small>
      <TodoList />
      <small className="proj">Project 2</small>
      <Cardbar />
      <small className="proj">Project 3.1</small>
      <Colorscheme toggleColors={props.toggleColors} colors={colors} buttonText={props.pageStyle.taro} />
      <small className="proj">Project 3.2</small>
      <FakeFormOut formData={props.formData} retakeForm={props.retakeForm} />
    </div>
  )
}
