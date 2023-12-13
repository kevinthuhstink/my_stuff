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
  const [ game, setGame ] = React.useState({});

  //on main4 render, initialize the grid
  //whenever the grid changes dimension, check the cells
  React.useEffect( setGrid, [ props.renderEffects ] );
  function setGrid() {
    const gridObj = document.getElementById( "game--grid" );
    if ( gridObj == null )
      return;

    //once grid has been initialized, recalc when resized using ResizeObserverEntry syntax
    //apparently ResizeObserver activates on initialization as well
    function calcGrid( entry ) {
      const cellSize = 32; //+2 to account for border width and height
      var updateColNum = Math.floor( ( entry.borderBoxSize[0].inlineSize - 32 ) / cellSize );
      var updateRowNum = Math.floor( ( entry.borderBoxSize[0].blockSize - 32 ) / cellSize );

      //create new cellsData array with width and length
      var updateCellsData = [];
      for ( var xpos = 0; xpos < updateColNum; xpos++ ) {
        for ( var ypos = 0; ypos < updateRowNum; ypos++ ) {
          updateCellsData.push( {
            alive: false,
            key: xpos * updateColNum + ypos,
            id: xpos * updateColNum + ypos,
          } );
        }
      }

      setGame( prevGame => ( {
        ...prevGame,
        cellSize: cellSize,
        colNum: updateColNum,
        rowNum: updateRowNum,
        cellsData: updateCellsData,
        gameActive: false,
      } ) );
    } //end calcGrid()

    const gridObserver = new ResizeObserver( gridUpdateEntry => {
      for ( const entry of gridUpdateEntry )
        calcGrid( entry );
    } );
    gridObserver.observe( gridObj );

    return () => gridObserver.disconnect();
  } //end setGrid()

  //toggle functions
  const toggleFunctions = [
    toggleCell,
    toggleGame
  ]

  function toggleCell( cellID ) {
    setGame( prevGame => {
      var newCellsData = prevGame.cellsData.map( function( cell ) {
        if ( cell.id !== cellID )
          return cell;
        return {
          ...cell,
          alive: !cell.alive,
        }; //note that you MUST check by obj id
      } ); //there is no guarantee that obj id and array index match up

      return {
        ...prevGame,
        cellsData: newCellsData,
      }
    } );
  } //end toggleCell()

  function toggleGame() {
    setGame( prevGame => ( {
      ...prevGame,
      gameActive: !prevGame.gameActive,
    } ) );
  }

  return (
    <main className="main4" style={props.mainStyle}>
      <h1 className="main--title">Main 4: Game of Life</h1>
      <GameOfLife game={game} toggleFunctions={toggleFunctions} />
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
