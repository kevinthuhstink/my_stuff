import React from 'react';
import data from './data.js';
//main1
import TodoList from './TodoList.js';
import nerv from './img/nerv.png';
//main2
import Cardbar from './Cardbar.js';
//main3
import donut from './img/donut.gif';
//main
import Form from './Form.js';

/*
const mainStyle = {
  background: props.pageStyle.taro ?
    props.colors.taroMainBackground :
    props.colors.defaultMainBackground,
  width: `${props.pageStyle.mainWidth}vw`
}
const buttonColors = { //colors prop can be sent down multiple layers
  background: props.pageStyle.taro ?
    props.colors.taroHeaderBackground :
    props.colors.defaultHeaderBackground,
}
const textColors = {
  color: props.pageStyle.taro ?
    "black" :
    "white"
} */

function Main( props ) {
  const buttonColors = { //colors prop can be sent down multiple layers
    background: props.pageStyle.taro ?
      data.colors.taroHeaderBackground :
      data.colors.defaultHeaderBackground,
  }
  const textColors = {
    color: props.pageStyle.taro ?
      "black" :
      "white"
  }

  //load the main version corresponding to props.mainVersion
  //0 (default) means most recent

  return (
    <main style={props.mainStyle}>
      <h1 className="main--title">Generate Bible Verse</h1>
      <Form colors={buttonColors} textColors={textColors} />
    </main>
  )
}

function Main1( props ) {
  const backgroundImageStyle = {
    right: `${100 - props.pageStyle.mainWidth}vw`,
  }
  return (
    <main className="main1" style={props.mainStyle}>
      <h1 classname="main--title">Main 1: Static Page</h1>
      <TodoList />
      <img className="main--background" src={nerv} style={backgroundImageStyle} alt="" />
    </main>
  )
}

function Main2( props ) {
  return (
    <main className="main2" style={props.mainStyle}>
      <h1 classname="main--title">Main 2: Reusable Card Component</h1>
      <TodoList />
      <Cardbar />
    </main>
  )
}

function Main3( props ) {
  const [ showDonut, setShowDonut ] = React.useState( false );
  const donutStyle = {
    width: `calc( ${props.pageStyle.mainWidth}vw - 80px )`,
    height: `calc( ${props.pageStyle.mainWidth}vw - 80px )`,
  }
  function displayDonut( event ) {
    setShowDonut( prevShowDonut => !prevShowDonut );
  }
  return (
    <main className="main3" style={props.mainStyle}>
      <h1 classname="main--title">Main 3: Interactive Components</h1>
      <button onClick={displayDonut}>
        { showDonut ? 
          "Hide Donut" :
          "Display Donut!" }
      </button>
      { showDonut && <img className="donut--gif" style={donutStyle} src={donut} alt="" />}
    </main>
  )
}

const MainVersions = [
  Main,
  Main1,
  Main2,
  Main3
]

export default MainVersions;
