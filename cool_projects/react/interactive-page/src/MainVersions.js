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
  const [ game, setGame ] = React.useState({})

  function Cell( props ) {
    const cellStyle = {
      background: props.alive ?
        "gray" :
        "white",
      width: `${props.cellSize}px`,
      height: `${props.cellSize}px`,
    }
    return (
      <div className="cell" style={cellStyle}>
      </div>
    )
  }

  //on main4 render, initialize the grid 
  React.useEffect( setGrid, [ props.renderEffect ] );
  function setGrid() {
    const gridObj = document.getElementById( "game--grid" );
    if ( gridObj == null )
      return;

    function initGrid() {
      const cellSize = 30;
      var colNum = Math.floor( ( gridObj.offsetWidth - 32 ) / cellSize );
      var rowNum = Math.floor( ( gridObj.offsetHeight - 32 ) / cellSize );

      // create each cell's data using a 2d array of mappings
      var cellsArray = [];
      for ( var xpos = 0; xpos < colNum; xpos++ ) {
        cellsArray.push( [] );
        for ( var ypos = 0; ypos < rowNum; ypos++ ) {
          cellsArray[xpos].push( {
            alive: false,
            key: xpos * colNum + ypos,
          } );
        }
      }

      // initialize an array of cells objects using the cell data
      function initCells( cellsData ) {
        var cells = [];
        for ( var xpos = 0; xpos < cellsData.length; xpos++ )
          for ( var ypos = 0; ypos < cellsData[xpos].length; ypos++ )
            cells.push( <Cell {...cellsData[xpos][ypos]} cellSize={cellSize} /> );
        return cells;
      } //end initCells()

      return {
        cellSize: cellSize,
        colNum: colNum,
        rowNum: rowNum,
        cellsData: cellsArray,
        cells: initCells( cellsArray ),
      }
    } //end initGrid()

    setGame( initGrid );

    //once grid has been initialized, recalc when resized
    function recalcGrid( entry ) {
      var { cellSize, colNum, rowNum, cellsData, cells } = game;
      var updateColNum = Math.floor( ( entry.borderBoxSize[0].inlineSize - 32 ) / cellSize );
      var updateRowNum = Math.floor( ( entry.borderBoxSize[0].blockSize - 32 ) / cellSize );
      if ( updateColNum === colNum && updateRowNum === rowNum )
        return;

      //update cellsData and construct new cellsArray
      if ( updateColNum < colNum )
        cellsData = cellsData.slice( updateColNum )
      else {
      }
      if ( updateRowNum < rowNum )
        for ( var col = 0; col < cellsData.length; col++ )
          cellsData[col] = cellsData[col].slice( updateRowNum );
      else {
      }
    }

    const gridObserver = new ResizeObserver( entries => {
      for ( const entry of entries ) {
        recalcGrid( entry );
      }
    } );
    gridObserver.observe( gridObj );
    return () => gridObserver.disconnect();
  } //end setGrid()

  function toggleCell( cellID ) {
    setGame( function( prevGame ) {
      var newCells = [ ...prevGame.cells ];
      newCells[cellID].alive = !prevGame.cells[cellID].alive
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
