import React from 'react'
import ControlPanel from './ControlPanel.js'
import GameGrid from './GameGrid.js'

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
 * Black is alive white is dead
 */

/* create a Cell object for each cell in the grid
 * all it does is toggle true/false when clicked or generations are run
 */

export default function GameOfLife(props) {
  return (
    <div className="game">
      <ControlPanel
        control={props.game}
        controlStyle={props.gameStyle}
        gameFunctions={props.gameFunctions}
        sliderStates={props.sliderStates} />
      <GameGrid
        grid={props.game}
        toggleCell={props.toggleCell}
        sliderStates={props.sliderStates} />
    </div>
  )
}
