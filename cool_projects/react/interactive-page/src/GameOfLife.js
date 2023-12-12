import React from 'react';

/* PROJECT 4
 * Conway's Game of Life
 *
 * Scalable grid, run generations, generations speed slider
 * Click cells on the grid to set them alive/dead
 * White is alive black is dead
 */

function ControlPanel() {
  return (
    <div id="game--control">
    </div>
  )
}

/* create a Cell object for each cell in the grid
 * all it does is toggle true/false when clicked or generations are run
 * TODO: format the grid based on cell size
 *
 * grid = { cellSize, rowNum, colNum, cellsData, cells }
 */
function GameGrid( props ) {
  const gridStyle = {
    gridTemplateColumns: `${props.grid.cellSize}px `.repeat( props.grid.colNum ),
    gridTemplateRows: `${props.grid.cellSize}px `.repeat( props.grid.rowNum ),
  }
  return (
    <div id="game--grid" style={gridStyle}>
      {props.grid.cells}
    </div>
  )
}

export default function GameOfLife( props ) {
  return (
    <div className="game">
      <ControlPanel />
      <GameGrid grid={props.game} />
    </div>
  )
}
