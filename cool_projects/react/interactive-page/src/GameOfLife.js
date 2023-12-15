import React from 'react';
import data from './data.js'

/* PROJECT 4
 * Conway's Game of Life
 * Rules:
 * Live cells with 0 or 1 neighbor dies
 * Cells with 2 neighbors don't change
 * Dead cells with 3 neighbors come to life
 * Live cells with 4 neighbors die
 *
 * Scalable grid, run generations, generations speed slider
 * Click cells on the grid to set them alive/dead
 * White is alive black is dead
 */

/*
 * control: { showID, gameActive }
 */
function ControlPanel( props ) {
  const [ runGeneration, runGame, toggleID ] = props.controlFunctions;
  const buttonColors = { //colors prop can be sent down multiple layers
    background: props.pageStyle.taro ?
      data.colors.taroHeaderBackground :
      data.colors.defaultHeaderBackground,
    color: props.pageStyle.taro ?
      "black" :
      "white",
  }

  function Slider( props ) {
    return (
      <div className="slider--container">
        <input type="range"
          className="slider"
          min={props.min}
          max={props.max}
          value={props.value}
          id={props.id} />
      </div>
    )
  }

  return (
    <div id="game--control">
      <button onClick={runGame} style={buttonColors}>
        {props.control.gameActive ? "Stop Game" : "Start Game"}
      </button>
      <button onClick={runGeneration} style={buttonColors}>
        Run One Generation
      </button>
      <button onClick={toggleID} style={buttonColors}>
        {props.control.showID ? "Hide" : "Show"} Cell ID
      </button>
      <Slider />
      <Slider />
      <Slider />
    </div>
  )
}

/* create a Cell object for each cell in the grid
 * all it does is toggle true/false when clicked or generations are run
 * TODO: format the grid based on cell size
 *
 * grid: { cellSize, rowNum, colNum, cellsData }
 */
function GameGrid( props ) {
  const [ toggleCell ] = props.gridFunctions;

  function Cell( props ) {
    const cellStyle = {
      background: props.alive ?
        "gray" :
        "white",
      width: `${props.cellSize - 2}px`,
      height: `${props.cellSize - 2}px`,
    }
    return (
      <div className="cell" style={cellStyle} onClick={props.toggleCell}>
        <p>{props.showID && `${props.id}`}</p>
      </div>
    )
  }

  const gridStyle = {
    gridTemplateColumns: `${props.grid.cellSize}px `.repeat( props.grid.colNum ),
    gridTemplateRows: `${props.grid.cellSize}px `.repeat( props.grid.rowNum ),
  }
  if ( props.grid.cellsData ) //ensures we render when cellsData gets instantiated in Main in useEffect
    var cells = props.grid.cellsData.map(
      cellRow => cellRow.map(
        cell => <Cell {...cell} cellSize={props.grid.cellSize} showID={props.grid.showID} toggleCell={() => toggleCell(cell.id)} />
      )
    );

  return (
    <div id="game--grid" style={gridStyle}>
      {props.grid.cellsData && cells}
    </div>
  )
}

export default function GameOfLife( props ) {
  const slicePos = 1;
  const controlFunctions = props.gameFunctions.slice( slicePos );
  const gridFunctions = props.gameFunctions.slice( 0, props.gameFunctions.length - slicePos - 1 );
  return (
    <div className="game">
      <ControlPanel control={props.game} pageStyle={props.pageStyle} controlFunctions={controlFunctions} />
      <GameGrid grid={props.game} gridFunctions={gridFunctions} />
    </div>
  )
}
