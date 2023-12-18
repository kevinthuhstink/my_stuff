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
import Slider from './CustomSlider.js'

function Main5( props ) {
  const testSlider = {
    id: "testSlider",
    max: 0,
    min: 100,
    value: 50,
    containerStyle: {
      flexDirection: "row",
    },
    bodyStyle: {
      background: "#333333",
    },
    thumbStyle: {
      background: props.mainStyle.buttonStyle.background,
      left: "50%",
    },
  };

  const sliderData = {
    testSlider: testSlider,
  }

  const [ values, setValues ] = React.useState( sliderData );
  React.useEffect( initSliders, [ props.renderEffects ] );
  function initSliders() {
    const sliders = document.getElementsByClassName( "slider--container" );
    for ( var slider of sliders ) {
      const sliderThumb = slider.getElementsByClassName( "slider--thumb" )[0];
      sliderThumb.addEventListener( "mousedown", () => handleSlider( slider.id ) );
    }

    function handleSlider( sliderID ) {
      slider = document.getElementById( sliderID );
      const sliderBody = slider.getElementsByClassName( "slider--body" )[0];
      const sliderThumb = slider.getElementsByClassName( "slider--thumb" )[0];
      sliderThumb.addEventListener( "mousemove", moveSlider );
      sliderThumb.addEventListener( "mouseup", stopDrag );

      function moveSlider( event ) {
        //physically move the slider and update its value
        const { left, right, width } = sliderBody.getBoundingClientRect();
        const mousePos = event.screenX;
        if ( mousePos < left || mousePos > right )
          return; //set bounds
        console.log( slider.id );

        function updatePosition( thisSlider ) {
          const newPos = ( mousePos - left ) / width;
          const newVal = ( newPos - left ) * ( thisSlider.max - thisSlider.min );
          return {
            ...thisSlider,
            value: newVal,
            thumbStyle: {
              ...thisSlider.thumbStyle,
              left: newPos,
            }
          }
        }

        setValues( prevValues => ( {
          ...prevValues,
          [slider.id]: updatePosition( prevValues[slider.id] ),
        } ) );
      }

      function stopDrag() {
        sliderThumb.removeEventListener( "mousemove", moveSlider );
        sliderThumb.removeEventListener( "mouseup", stopDrag );
      }
    }
  }

  return (
    <main id="main5" style={props.mainStyle}>
      <h1 className="main--title">Main 5: 3D Graphing Calculator</h1>
      <div id="calculator">
        <Slider sliderStyle={testSlider} />
      </div>
    </main>
  );
}

function Main4( props ) {
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

  function handleSlider( event ) {
    const { id, value } = event.target;
    //destructure id and value from the input type=range objects

    if ( id === "intervalTime" ) {
      //stops previous and sets new intervals accordingly when slider changes
      if ( game.gameActive ) {
        clearInterval( game.gameActive );
        setGame( prevGame => ( {
          ...prevGame,
          gameActive: setInterval( runGeneration, value ),
        } ) );
      }
    }

    setGame( prevGame => ( {
      ...prevGame,
      [id]: value,
    } ) );
  }


  //gameplay functions
  function runGeneration() {
    console.log( "running generation" );
    setGame( function( prevGame ) {
      const grid = prevGame.cellsData;

      function checkStatus( cell ) {
        //checks if a given cell should live or die according to the rules of the game
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

  function runGame() {
    setGame( prevGame => {
      const timingID = prevGame.gameActive ?
        clearInterval( prevGame.gameActive ) :
        setInterval( runGeneration, prevGame.intervalTime );
      return {
        ...prevGame,
        gameActive: timingID,
      };
    } );
  }

  const gameFunctions = [
    runGeneration,
    runGame,
    toggleID,
    randomGrid,
    handleSlider,
  ]

  return (
    <main id="main4" style={props.mainStyle}>
      <h1 className="main--title">Main 4: Game of Life</h1>
      <GameOfLife game={game} gameStyle={props.mainStyle} toggleCell={toggleCell} gameFunctions={gameFunctions} />
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
  Main5,
  Main1,
  Main2,
  Main3,
  Main4,
]

export default MainVersions;
