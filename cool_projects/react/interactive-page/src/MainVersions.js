import React from 'react';
import data from './data.js';
//main1
import TodoList from './TodoList.js';
import nerv from './img/nerv.png';
//main2
import Cardbar from './Cardbar.js';
//main3
import Form from './Form.js';
//main4
import GameOfLife from './GameOfLife.js'

function Main( props ) {
  const [ game, setGame ] = React.useState( {
    cellSize: 40,
    cells: [], //2d array of cells
    //gridWidth,
    //gridHeight
  } )

  //will need to reset grid on resize
  function initGrid() { 
    const gridObj = document.getElementById( "game--grid" );
    const gridSpace = gridObj.getBoundingClientRect();

    setGame( function( init ) {
      var gridWidth = Math.floor( gridSpace.width / init.cellSize );
      var gridHeight = Math.floor( gridSpace.height / init.cellSize );
      var cellsArray = [];
      for ( var xpos = 0; xpos < gridWidth; xpos++ ) {
        cellsArray.push( [] );
        for ( var ypos = 0; ypos < gridHeight; ypos++ ) {
          cellsArray[xpos].push( {
            alive: false,
            key: xpos * gridWidth + ypos,
          } );
        }
      }
      return {
        ...init,
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        cells: cellsArray,
      }
    } );
  }
  React.useEffect( initGrid, [ props.renderEffect ] );

  function toggleCell( cellNumber ) {
    setGame( function( prevGame ) {
      var newCells = [ ...prevGame.cells ];
      newCells[cellNumber] = !prevGame.cells[cellNumber]
      return {
        ...prevGame,
        cells: newCells,
      }
    } ) 
  }

  return (
    <main className="main4" style={props.mainStyle}>
      <h1 className="main--title">Main 4: Game of Life</h1>
      <GameOfLife game={game} toggleCell={toggleCell} />
    </main>
  )
}

function Main1( props ) {
  const backgroundImageStyle = {
    right: `${100 - props.pageStyle.mainWidth}vw`,
  }
  return (
    <main className="main1" style={props.mainStyle}>
      <h1 className="main--title">Main 1: Static Page</h1>
      <TodoList />
      <img className="main--background" src={nerv} style={backgroundImageStyle} alt="" />
    </main>
  )
}

function Main2( props ) {
  return (
    <main className="main2" style={props.mainStyle}>
      <h1 className="main--title">Main 2: Reusable Card Component</h1>
      <TodoList />
      <Cardbar />
    </main>
  )
}

function Main3( props ) {
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
      <h1 className="main--title">Main 3: Interactive Components</h1>
      <Form colors={buttonColors} textColors={textColors} />
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
