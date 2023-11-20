import React from 'react'
import Cardbar from './Cardbar.js'

function TodoList() {
  return (
    <div>
      <h1 className="sidebar--title">TODO:</h1>
      <ol className="sidebar--todo">
        <li>React JS</li>
        <li>Bootstrap</li>
        <li>NodeJS</li>
        <li>MySQL</li>
        <li>Git</li>
        <li>Leetcode 75</li>
        <li>Rest/JSON API</li>
        <li>AWS/Google Cloud</li>
        <li>Self-Study Projects</li>
        <li>Freelance Work</li>
      </ol>
    </div>
  )
}

function Colorscheme( props ) {
  return (
    <div className="colorscheme">
      <button className="setcolors" onClick={props.colorsToggle} style={props.colors}>
        { !props.taro ?
          "Pastel?" :
          "Purple?" }
      </button>
    </div>
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
  const styles = {
    background: props.taro ?
      "linear-gradient( 120deg, #ffccff 24%, #6666ff 100% )" :
      "linear-gradient( 120deg, Plum, SlateBlue )",
  }
  const colors = {
    background: !props.taro ?
      "linear-gradient( 30deg, #b3baff 40%, #333399 100% )" :
      "linear-gradient( 120deg, indigo 40%, navy 100% )",
    color: !props.taro ?
      "black" :
      "white"
  }
  /* inaccurate to have derived states from props
  const [ bg, setBg ] = React.useState( props.color );

  function bgToggle() {
    setColor( bg => !bg );
  } */

  return (
    <div className="sidebar" style={styles}>
      <Colorscheme colorsToggle={props.colorsToggle} colors={colors} taro={props.taro} />
      <small className="proj">Project 1</small>
      <TodoList />
      <small className="proj">Project 2</small>
      <Cardbar />
      <small className="proj">Project 3.2</small>
      <FakeFormOut formData={props.formData} retakeForm={props.retakeForm} />
    </div>
  )
}
