export default function GameGrid(props) {
  const cellSize = props.sliderStates.cellSize.value

  function Cell(props) {
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
  if (props.grid.cellsData) //ensures we render when cellsData gets instantiated in Main in useEffect
    var cells = props.grid.cellsData.map(
      cellRow => cellRow.map(
        cell => <Cell
          {...cell}
          showID={props.grid.showID}
          toggleCell={() => props.toggleCell(cell.id)} />
      )
    )

  return (
    <div id="game--grid" style={gridStyle}>
      {props.grid.cellsData && cells}
    </div>
  )
}
