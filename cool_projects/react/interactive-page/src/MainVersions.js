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
    //init default values
    showID: false,
    gameActive: 0,
    intervalTime: 1000,
    cellSize: 32, //includes border
  } );

  //game render functions
  function reloadGrid( prevGame, updateGameData ) {
    //stand-in for the setGame state setter
    //remakes grid on changes to grid size or cell size
    if ( prevGame.gameActive )
      clearInterval( prevGame.gameActive );

    //use updateGameData to determine what's being reloaded
    var updateRowNum = updateGameData.rowNum ? updateGameData.rowNum : prevGame.rowNum;
    var updateColNum = updateGameData.colNum ? updateGameData.colNum : prevGame.colNum;
    var updateCellSize = updateGameData.cellSize ? updateGameData.cellSize : prevGame.cellSize;

    //create new cellsData 2d array with width and length
    if ( updateGameData.rowNum || updateGameData.colNum ) {
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
    }

    return {
      ...prevGame,
      cellSize: updateCellSize,
      colNum: updateColNum,
      rowNum: updateRowNum,
      cellsData: updateCellsData ? updateCellsData : prevGame.cellsData,
      gameActive: 0,
    }
  } //end reloadGrid()

  React.useEffect( setGrid, [ props.renderEffects, game.cellSize ] );
  function setGrid() {
    const gridObj = document.getElementById( "game--grid" );
    if ( gridObj == null )
      return;

    //once grid has been initialized, recalc when resized using ResizeObserverEntry syntax
    function calcGrid( entry ) {
      //apparently ResizeObserver activates on initialization as well
      //only entry.borderBoxSizes are altered and the function isn't actually ran
      const updateColNum = Math.floor( ( entry.borderBoxSize[0].inlineSize - 32 ) / game.cellSize );
      const updateRowNum = Math.floor( ( entry.borderBoxSize[0].blockSize - 32 ) / game.cellSize );
      const update = {
        colNum: updateColNum,
        rowNum: updateRowNum,
      }
      setGame( prevGame => reloadGrid( prevGame, update ) );
    } //end calcGrid()

    //on changes to intervalTime, make sure those changes are reflected in the actual game

    const gridObserver = new ResizeObserver( gridUpdateEntry => {
      for ( const entry of gridUpdateEntry ) {
        calcGrid( entry );
      }
    } );
    gridObserver.observe( gridObj );

    //cleanup the previous effect before starting a new one
    return () => gridObserver.disconnect();
  } //end setGrid()


  //game mutator functions
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

  function randomGrid() {
    setGame( prevGame => ( {
      ...prevGame,
      cellsData: prevGame.cellsData.map( cellRow => cellRow.map(
        cell => ( {
          ...cell,
          alive: !!Math.floor( Math.random() * 2 ),
        } )
      ) ),
    } ) );
  }

  function handleSlider( event ) {
    const { id, value } = event.target;
    //destructure id and value from the input type=range objects
    setGame( prevGame => ( {
      ...prevGame,
      cellSize: id === "cell--size--slider" ? value : prevGame.cellSize,
      intervalTime: id === "interval--time--slider" ? value : prevGame.intervalTime,
    } ) );
  }


  //gameplay functions
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
        gameActive: setInterval( runGeneration, prevGame.intervalTime ),
      } ) );
    }
  }

  const gameFunctions = [
    toggleCell,
    runGeneration,
    runGame,
    toggleID,
    randomGrid,
    handleSlider,
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
      <p>Type in 'donut' for a donut!</p>
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
