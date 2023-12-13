import React from 'react';

/* PROJECT 4
 * Conway's Game of Life
 *
 * Scalable grid, run generations, generations speed slider
 * Click cells on the grid to set them alive/dead
 * White is alive black is dead
 */

/*
 * control: { gameActive }
 */
function ControlPanel( props ) {
  return (
    <div id="game--control">
      <button onClick={props.toggleGame}>
        {props.control.gameActive ? "Stop Game" : "Start Game"}
      </button>
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
      </div>
    )
  }

  const gridStyle = {
    gridTemplateColumns: `${props.grid.cellSize}px `.repeat( props.grid.colNum ),
    gridTemplateRows: `${props.grid.cellSize}px `.repeat( props.grid.rowNum ),
  }
  if ( props.grid.cellsData ) //ensures we render when cellsData gets instantiated in Main in useEffect
    var cells = props.grid.cellsData.map( cell => <Cell {...cell} cellSize={props.grid.cellSize} toggleCell={() => props.toggleCell(cell.id)} /> );

  return (
    <div id="game--grid" style={gridStyle}>
      {props.grid.cellsData && cells}
    </div>
  )
}

export default function GameOfLife( props ) {
  return (
    <div className="game">
      <ControlPanel control={props.game} toggleGame={props.toggleFunctions[1]} />
      <GameGrid grid={props.game} toggleCell={props.toggleFunctions[0]} />
    </div>
  )
}
