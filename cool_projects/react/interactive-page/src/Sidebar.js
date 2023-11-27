import React from 'react'
import Cardbar from './Cardbar.js'
import TodoList from './TodoList.js'

function Colorscheme( props ) {
  return (
    <button className="setcolors" onClick={props.colorsToggle} style={props.colors}>
      { !props.colorsTaro ?
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
      props.colors.taroSidebarBackground :
      props.colors.defaultSidebarBackground,
    width: `${props.pageStyle.sidebarWidth}vw`,
  }
  const colors = {
    background: !props.pageStyle.taro ?
      props.colors.taroHeaderBackground :
      props.colors.defaultHeaderBackground,
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
      <Colorscheme colorsToggle={props.colorsToggle} colors={colors} colorsTaro={props.pageStyle.taro} />
      <small className="proj">Project 3.2</small>
      <FakeFormOut formData={props.formData} retakeForm={props.retakeForm} />
    </div>
  )
}
