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
    <div className="game--control">
    </div>
  )
}

/* create a Cell object for each cell in the grid
 * all it does is toggle true/false when clicked or generations are run
 */
function GameGrid( props ) {

  function Cell( props ) {
    const cellStyle = {
      background: props.alive ?
        "white" :
        "black"
    }
    return (
      <div className="cell" style={cellStyle}>
      </div>
    )
  }

  var cells = [];
  //issue: state push the cell array before initgrid activates in the main func
  for ( var xpos = 0; xpos < props.grid.width; xpos++ )
    for ( var ypos = 0; ypos < props.grid.height; ypos++ )
      cells.push( <Cell {...props.grid.cells[xpos][ypos]} cellSize={props.grid.cellSize} /> );
  //console.log( cells );

return (
    <div id="game--grid">
      {cells}
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
