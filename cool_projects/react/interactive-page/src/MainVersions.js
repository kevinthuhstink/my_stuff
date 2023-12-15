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
    showID: false,
    gameActive: 0,
  } );

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

      setGame( function( prevGame ) {
        if ( prevGame.gameActive )
          //doesnt really work outside of setGame because
          //gameActive needs to be called from prevGame, not game itself
          clearInterval( prevGame.gameActive ); 

        //create new cellsData 2d array with width and length
        var updateCellsData = [];
        for ( var ypos = 0; ypos < updateRowNum; ypos++ ) {
          updateCellsData.push( [] );
          for ( var xpos = 0; xpos < updateColNum; xpos++ ) {
            updateCellsData[ypos].push( {
              alive: false,
              key: ypos * updateColNum + xpos, 
              id: ypos * updateColNum + xpos,
            } );
          }
        }

        return {
          ...prevGame,
          cellSize: cellSize,
          colNum: updateColNum,
          rowNum: updateRowNum,
          cellsData: updateCellsData,
          gameActive: 0,
        }
      } );
    } //end calcGrid()

    const gridObserver = new ResizeObserver( gridUpdateEntry => {
      for ( const entry of gridUpdateEntry ) {
        calcGrid( entry );
      }
    } );
    gridObserver.observe( gridObj );

    return () => gridObserver.disconnect();
  } //end setGrid()

  function toggleCell( cellID ) {
    setGame( prevGame => ( {
      ...prevGame,
      cellsData: prevGame.cellsData.map( cellRow => cellRow.map(
        cell => cell.id === cellID ? {
          ...cell,
          alive: !cell.alive
        } : cell
      ) ), //have to remake a deep copy of cellsData
    } ) );
  } //end toggleCell()

  function toggleID() {
    setGame( prevGame => ( {
      ...prevGame,
      showID: !prevGame.showID,
    } ) );
  }

  function runGeneration() {
    console.log( "running generation" );
    setGame( function( prevGame ) {
      const grid = prevGame.cellsData;
    
      function checkStatus( cellID ) { 
        //checks if a given cell should live or die
        const ypos = Math.floor( cellID / prevGame.colNum );
        const xpos = cellID % prevGame.colNum;

        //calc the number of live neighbors the cell has
        let liveNeighbors = 0;
        //orthogonal
        if ( ypos > 0 && grid[ypos - 1][xpos].alive )
          liveNeighbors++;
        if ( xpos > 0 && grid[ypos][xpos - 1].alive )
          liveNeighbors++;
        if ( ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos].alive )
          liveNeighbors++;
        if ( xpos < prevGame.colNum - 1 && grid[ypos][xpos + 1].alive )
          liveNeighbors++;
        //diagonal
        if ( xpos > 0 && ypos > 0 && grid[ypos - 1][xpos - 1].alive )
          liveNeighbors++;
        if ( xpos > 0 && ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos - 1].alive )
          liveNeighbors++;
        if ( xpos < prevGame.colNum - 1 && ypos > 0 && grid[ypos - 1][xpos + 1].alive )
          liveNeighbors++;
        if ( xpos < prevGame.colNum - 1 && ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos + 1].alive )
          liveNeighbors++;

        //determine if the cell should die or live
        if ( liveNeighbors === 3 )
          return true;
        if ( liveNeighbors === 2 )
          return grid[ypos][xpos].alive;
        else
          return false;
      }

      return {
        ...prevGame,
        cellsData: grid.map( cellRow => cellRow.map( cell => ( {
          ...cell,
          alive: checkStatus( cell.id ),
        } ) ) ),
      }
    } );
  }

  function runGame() {
    if ( game.gameActive !== 0 ) {
      clearInterval( game.gameActive );
      setGame( prevGame => ( {
        ...prevGame,
        gameActive: 0,
      } ) );
    }
    else {
      setGame( prevGame => ( {
        ...prevGame,
        gameActive: setInterval( runGeneration, 1000 ),
      } ) );
    }
  }

  const gameFunctions = [
    toggleCell,
    runGeneration,
    runGame,
    toggleID,
  ]

  return (
    <main className="main4" style={props.mainStyle}>
      <h1 className="main--title">Main 4: Game of Life</h1>
      <GameOfLife game={game} pageStyle={props.pageStyle} gameFunctions={gameFunctions} />
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
