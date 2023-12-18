import React from 'react';

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
  const [ runGeneration, runGame, toggleID, randomGrid ] = props.gameFunctions;
  const { cellSize, interval } = props.sliderStates;
  const buttonColors = props.controlStyle.buttonStyle;
  const sliderStyle = { //read only because this affects multiple sliders
    thumbStyle: {
      ...buttonColors,
    }
  };
  const Slider = props.Slider;

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
      <Slider sliderData={cellSize} sliderStyle={sliderStyle} />
      <Slider sliderData={interval} sliderStyle={sliderStyle} />
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
  const cellSize = props.sliderStates.cellSize.value;

  function Cell( props ) {
    const cellStyle = {
      background: props.alive ?
        "gray" :
        "white",
      width: `${cellSize - 2}px`,
      height: `${cellSize - 2}px`,
      fontSize: `${cellSize / 2 - 1}px`,
    }
    return (
      <div className="cell" style={cellStyle} onClick={props.toggleCell}>
        {props.showID && `${props.id}`}
      </div>
    )
  }

  const gridStyle = {
    gridTemplateColumns: `${cellSize}px `.repeat( props.grid.colNum ),
    gridTemplateRows: `${cellSize}px `.repeat( props.grid.rowNum ),
  }
  if ( props.grid.cellsData ) //ensures we render when cellsData gets instantiated in Main in useEffect
    var cells = props.grid.cellsData.map(
      cellRow => cellRow.map(
        cell => <Cell
          {...cell}
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
      <ControlPanel
        control={props.game}
        controlStyle={props.gameStyle}
        gameFunctions={props.gameFunctions}
        Slider={props.Slider}
        sliderStates={props.sliderStates} />
      <GameGrid
        grid={props.game}
        toggleCell={props.toggleCell}
        sliderStates={props.sliderStates} />
    </div>
  )
}
