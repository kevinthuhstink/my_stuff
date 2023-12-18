import React from 'react';
import data from './data.js';
//main1
import nerv from './img/nerv.png';
//main2
import Cardbar from './Cardbar.js';
//main3
import Form from './Form.js';
//main4
import GameOfLife from './GameOfLife.js'
import sliderMechanics from './Slider.js'

function Main4( props ) {
  const [ game, setGame ] = React.useState( {
    //init default values
    showID: false,
    gameActive: null,
  } );
  const [ Slider, initSliders ] = sliderMechanics;
  const cellSizeSlider = {
    id: "cellSize",
    min: 8,
    max: 32,
    value: 32, //includes border
    pos: 100,
    labelText: "Change Cell Size",
  }
  const intervalSlider = {
    id: "interval",
    min: 30,
    max: 1000,
    value: 1000,
    pos: 100,
    labelText: "Change Game Speed",
    onChange: resetInterval,
  }
  const initSliderStates = {
    cellSize: cellSizeSlider,
    interval: intervalSlider,
  }


  //game render functions
  const [ sliderStates, setSliderStates ] = React.useState( initSliderStates );
  React.useEffect( () => initSliders( setSliderStates ), [ initSliders ] );

  function setGrid() {
    const gridObj = document.getElementById( "game--grid" );
    if ( gridObj == null )
      return;

    //once grid has been initialized, recalc when resized using ResizeObserverEntry syntax
    function calcGrid( entry ) {
      //apparently ResizeObserver activates on initialization as well
      //only entry.borderBoxSizes are altered and the function isn't actually ran
      const cellSize = sliderStates.cellSize.value;
      const updateColNum = Math.floor( ( entry.borderBoxSize[0].inlineSize - 32 ) / cellSize );
      const updateRowNum = Math.floor( ( entry.borderBoxSize[0].blockSize - 32 ) / cellSize );

      function reloadGrid( prevGame ) {
        //stand-in for the setGame state setter
        //remakes grid on changes to grid size or cell size
        if ( updateRowNum === prevGame.rowNum && updateColNum === prevGame.colNum )
          return prevGame;
        if ( prevGame.gameActive )
          clearInterval( prevGame.gameActive );

        //create new cellsData 2d array with new width and length
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
          colNum: updateColNum,
          rowNum: updateRowNum,
          cellsData: updateCellsData,
          gameActive: 0,
        }
      } //end reloadGrid()

      setGame( prevGame => reloadGrid( prevGame ) );
    } //end calcGrid()

    const gridObserver = new ResizeObserver( gridUpdateEntry => {
      for ( const entry of gridUpdateEntry )
        calcGrid( entry );
    } );
    gridObserver.observe( gridObj );
    return () => gridObserver.disconnect();
  } //end setGrid()
  React.useEffect( setGrid, [ sliderStates.cellSize.value ] );



  //game mutator functions
  function setCellsStatus( prevCellData, liveFunction ) {
    //the liveFunction tells which cells in cellsData to live or die
    return prevCellData.map( cellRow => {
      return cellRow.map( cell => ( {
        ...cell,
        alive: liveFunction( cell ),
      } ) );
    } );
  }

  function toggleCell( cellID ) {
    const liveFunction = cell => cell.id === cellID ? !cell.alive : cell.alive;
    setGame( prevGame => ( {
      ...prevGame,
      cellsData: setCellsStatus( prevGame.cellsData, liveFunction ),
    } ) );
  } //end toggleCell()

  function toggleID() {
    setGame( prevGame => ( {
      ...prevGame,
      showID: !prevGame.showID,
    } ) );
  }

  function randomGrid() {
    const liveFunction = cell => !!Math.floor( Math.random() * 2 );
    setGame( prevGame => ( {
      ...prevGame,
      cellsData: setCellsStatus( prevGame.cellsData, liveFunction ),
    } ) );
  }


  //gameplay functions
  const runGenerationCallback = React.useCallback( runGeneration, [] );
  //what this line does is it wraps the runGeneration function
  //so that the runGenerationCallback itself doesn't change, even if runGeneration will
  function runGeneration() {
    setGame( prevGame => {
      function checkStatus( cell ) {
        //checks if a given cell should live or die according to the rules of the game
        const grid = prevGame.cellsData;
        const cellID = cell.id;
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
        cellsData: setCellsStatus( prevGame.cellsData, checkStatus ),
      }
    } );
  }

  //timers are meant to run async so wrap them in a useEffect
  function runGame() {
    const timingID = game.gameActive ?
      clearInterval( game.gameActive ) :
      setInterval( runGenerationCallback, sliderStates.interval.value );
    setGame( prevGame => ( {
      ...prevGame,
      gameActive: timingID,
    } ) );
  }

  //the interval slider callback function
  function resetInterval() {
    setGame( prevGame => {
      if ( !prevGame.gameActive )
        return prevGame;
      clearInterval( prevGame.gameActive );
      return {
        ...prevGame,
        gameActive: setInterval( runGenerationCallback, sliderStates.interval.value ),
      }
    } );
  }
  React.useEffect( resetInterval, [ sliderStates.interval.value, runGenerationCallback ] );

  const gameFunctions = [
    runGeneration,
    runGame,
    toggleID,
    randomGrid,
    resetInterval,
  ]

  return (
    <main id="main4" style={props.mainStyle}>
      <h1 className="main--title">Main 4: Game of Life</h1>
      <GameOfLife
        game={game}
        gameStyle={props.mainStyle}
        toggleCell={toggleCell}
        gameFunctions={gameFunctions}
        Slider={Slider}
        sliderStates={sliderStates} />
    </main>
  )
}

function Main1( props ) {
  const backgroundImageStyle = {
    right: `${100 - props.pageStyle.mainWidth}vw`,
  }
  return (
    <main id="main1" style={props.mainStyle}>
      <h1 className="main--title">Main 1: Static Page</h1>
      {data.todoList}
      <img className="main--background" src={nerv} style={backgroundImageStyle} alt="" />
    </main>
  )
}

function Main2( props ) {
  return (
    <main id="main2" style={props.mainStyle}>
      <h1 className="main--title">Main 2: Reusable Card Component</h1>
      {data.todoList}
      <Cardbar />
    </main>
  )
}

function Main3( props ) {
  return (
    <main id="main3" style={props.mainStyle}>
      <h1 className="main--title">Main 3: Interactive Components</h1>
      <p>Type in 'donut' for a donut!</p>
      <Form buttonStyle={props.mainStyle.buttonStyle} />
    </main>
  )
}

//load the main version corresponding to props.mainVersion
//0 (default) means most recent
const MainVersions = [
  Main4,
  Main1,
  Main2,
  Main3,
]

export default MainVersions;
