import React from 'react';
import Slider from './Slider.js'

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
 * control: { showID, gameActive, sliderValues }
 * sliderValues: { cellSize, intervalTime }
 */
function ControlPanel( props ) {
  const [ runGeneration, runGame, toggleID, randomGrid, handleSlider ] = props.gameFunctions;
  const buttonColors = props.controlStyle.buttonStyle;

  const cellSizeSlider = {
    min: 8,
    max: 32,
    step: 2,
    value: props.control.cellSize,
    id: "cellSize",
    labelText: "Change Cell Size",
  }
  const intervalSlider = {
    min: 30,
    max: 1000,
    step: 10,
    value: props.control.intervalTime,
    id: "intervalTime",
    labelText: "Change Game Speed",
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
      <Slider {...cellSizeSlider} handleSlider={handleSlider} />
      <Slider {...intervalSlider} handleSlider={handleSlider} />
      <button onClick={randomGrid} style={buttonColors}>
        Set Random Grid
      </button>
    </div>
  )
}

/* create a Cell object for each cell in the grid
 * all it does is toggle true/false when clicked or generations are run
 *
 * grid: { cellSize, rowNum, colNum, cellsData }
 */
function GameGrid( props ) {
  function Cell( props ) {
    const cellStyle = {
      background: props.alive ?
        "gray" :
        "white",
      width: `${props.cellSize - 2}px`,
      height: `${props.cellSize - 2}px`,
      fontSize: `${props.cellSize / 2 - 1}px`,
    }
    return (
      <div className="cell" style={cellStyle} onClick={props.toggleCell}>
        {props.showID && `${props.id}`}
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
        cell => <Cell
          {...cell}
          cellSize={props.grid.cellSize}
          showID={props.grid.showID}
          toggleCell={() => props.toggleCell(cell.id)} />
      )
    );

  return (
    <div id="game--grid" style={gridStyle}>
      {props.grid.cellsData && cells}
    </div>
  )
}

export default function GameOfLife( props ) {
  return (
    <div className="game">
      <ControlPanel control={props.game} controlStyle={props.gameStyle} gameFunctions={props.gameFunctions} />
      <GameGrid grid={props.game} toggleCell={props.toggleCell} />
    </div>
  )
}
