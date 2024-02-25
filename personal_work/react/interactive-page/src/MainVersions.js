import React from 'react'
import data from './data.js'
//main1
import nerv from './img/nerv.png'
//main2
import Cardbar from './Cardbar.js'
//main3
import Form from './form_components/Form.js'
//main4
import GameOfLife from './game_of_life_components/GameOfLife.js'
import {initSliders} from './Slider.js'
//main5
import Notes from './Notes.js'

function Main5(props) {
  function initItem(name, alt) {
    if (!localStorage.getItem(name))
      return alt
    return JSON.parse(localStorage.getItem(name))
  }
  const content = React.useRef(initItem("notes", []))
  const [settings, setSettings] = React.useState({
    titles: initItem("titles", []),
    tabbar: initItem("tabbar", []),
    fileNum: initItem("fileNum", 1),
    activeNote: initItem("activeNote", null),
    inputStyle: {
      fontSize: "12px",
      fontFamily: "monospace",
      fontWeight: null,
      fontStyle: null,
      textDecoration: null,
    },
    resizerPos: null,
    displayText: "",
  })

  console.log(localStorage)
  const control = [settings, setSettings, content]
  React.useEffect(() => {
    localStorage.setItem("titles", JSON.stringify(settings.titles))
    localStorage.setItem("tabbar", JSON.stringify(settings.tabbar))
    localStorage.setItem("activeNote", JSON.stringify(settings.activeNote))
    localStorage.setItem("fileNum", JSON.stringify(settings.fileNum))
  }, [settings])

  return (
    <main id="main5" style={props.mainStyle}>
      <h1 className="main--title">Main 5: Notes App</h1>
      <Notes control={control} />
    </main>
  )
}

function Main1(props) {
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

function Main2(props) {
  return (
    <main id="main2" style={props.mainStyle}>
      <h1 className="main--title">Main 2: Reusable Card Component</h1>
      {data.todoList}
      <Cardbar />
    </main>
  )
}

function Main3(props) {
  return (
    <main id="main3" style={props.mainStyle}>
      <h1 className="main--title">Main 3: Interactive Components</h1>
      <p>Type in 'donut' for a donut!</p>
      <Form buttonStyle={props.mainStyle.buttonStyle} />
    </main>
  )
}

function Main4(props) {
  const [game, setGame] = React.useState( {
    //init default values
    showID: false,
    gameActive: null,
  } )
  const sliders = {
    cellSize: {
      id: "cellSize",
      min: 8,
      max: 32,
      value: 32, //includes border
      pos: 100,
      sliderTitle: "Change Cell Size",
    },
    intervalSlider: {
      id: "interval",
      min: 30,
      max: 1000,
      value: 1000,
      pos: 100,
      sliderTitle: "Change Game Speed",
    }
  }


  //game render functions
  const [sliderStates, setSliderStates] = React.useState(sliders)
  React.useEffect(() => initSliders(setSliderStates), [])

  function setGrid() {
    const gridObj = document.getElementById("game--grid")
    if (gridObj == null)
      return

    function generateGrid(entry) {
      const cellSize = sliderStates.cellSize.value
      const gridWidth = entry.borderBoxSize[0].inlineSize - 32
      const gridHeight = entry.borderBoxSize[0].blockSize - 32
      const colNum = Math.floor(gridWidth / cellSize)
      const rowNum = Math.floor(gridHeight / cellSize)

      function reloadGrid(prevGame) {
        //stand-in for the setGame state setter
        //remakes grid on changes to grid size or cell size
        if (rowNum === prevGame.rowNum && colNum === prevGame.colNum)
          return prevGame
        if (prevGame.gameActive) //stops the game on resize
          clearInterval(prevGame.gameActive)

        //generate new cellsData 2d array with newly calculated width and length
        var cellsData = []
        for (var ypos = 0; ypos < rowNum; ypos++) {
          cellsData.push([])
          for (var xpos = 0; xpos < colNum; xpos++) {
            cellsData[ypos].push({
              alive: false,
              key: ypos * colNum + xpos,
              id: ypos * colNum + xpos,
            })
          }
        }

        return {
          ...prevGame,
          colNum: colNum,
          rowNum: rowNum,
          cellsData: cellsData,
          gameActive: 0,
        }
      } //end reloadGrid()

      setGame(prevGame => reloadGrid(prevGame))
    }

    const gridObserver = new ResizeObserver(resizeEntries => {
      const resizeGrid = resizeEntries[0]
      generateGrid(resizeGrid)
    })

    gridObserver.observe(gridObj)
    return () => gridObserver.disconnect()
  } //end setGrid()
  React.useEffect(setGrid, [sliderStates.cellSize.value])


  //game mutator functions
  function setCellsStatus(prevCellData, liveFunction) {
    //the liveFunction tells which cells in cellsData to live or die
    return prevCellData.map(cellRow => {
      return cellRow.map(cell => ({
        ...cell,
        alive: liveFunction(cell),
      }))
    })
  }

  function toggleCell(selected) {
    const liveFunction = cell => cell.id === selected ? !cell.alive : cell.alive
    setGame(prevGame => ({
      ...prevGame,
      cellsData: setCellsStatus(prevGame.cellsData, liveFunction),
    }))
  } //end toggleCell()

  function toggleID() {
    setGame(prevGame => ({
      ...prevGame,
      showID: !prevGame.showID,
    }))
  }

  function randomGrid() {
    const liveFunction = cell => !!Math.floor(Math.random() * 2)
    setGame(prevGame => ({
      ...prevGame,
      cellsData: setCellsStatus(prevGame.cellsData, liveFunction),
    }))
  }


  //gameplay functions
  const runGenerationCallback = React.useCallback(runGeneration, [])
  //so that the runGenerationCallback itself doesn't change, even if runGeneration will
  function runGeneration() {

    setGame(prevGame => {
      function determineAlive(cell) {
        const grid = prevGame.cellsData
        const cellID = cell.id
        const ypos = Math.floor(cellID / prevGame.colNum)
        const xpos = cellID % prevGame.colNum

        //calc the number of live neighbors the cell has
        let liveNeighbors = 0
        //orthogonal
        if (ypos > 0 && grid[ypos - 1][xpos].alive)
          liveNeighbors++
        if (xpos > 0 && grid[ypos][xpos - 1].alive)
          liveNeighbors++
        if (ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos].alive)
          liveNeighbors++
        if (xpos < prevGame.colNum - 1 && grid[ypos][xpos + 1].alive)
          liveNeighbors++
        //diagonal
        if (xpos > 0 && ypos > 0 && grid[ypos - 1][xpos - 1].alive)
          liveNeighbors++
        if (xpos > 0 && ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos - 1].alive)
          liveNeighbors++
        if (xpos < prevGame.colNum - 1 && ypos > 0 && grid[ypos - 1][xpos + 1].alive)
          liveNeighbors++
        if (xpos < prevGame.colNum - 1 && ypos < prevGame.rowNum - 1 && grid[ypos + 1][xpos + 1].alive)
          liveNeighbors++

        //determine if the cell should die or live
        if (liveNeighbors === 3)
          return true
        if (liveNeighbors === 2)
          return grid[ypos][xpos].alive
        else
          return false
      }

      return {
        ...prevGame,
        cellsData: setCellsStatus(prevGame.cellsData, determineAlive),
      }
    })
  }

  //timers are meant to run async so wrap them in a useEffect
  function runGame() {
    const timingID = game.gameActive ?
      clearInterval(game.gameActive) :
      setInterval(runGenerationCallback, sliderStates.interval.value)
    setGame(prevGame => ({
      ...prevGame,
      gameActive: timingID,
    }))
  }

  //the interval slider callback function
  function resetInterval() {
    setGame(prevGame => {
      if (!prevGame.gameActive)
        return prevGame
      clearInterval(prevGame.gameActive)
      return {
        ...prevGame,
        gameActive:
          setInterval(runGenerationCallback, sliderStates.interval.value),
      }
    })
  }
  React.useEffect(resetInterval, [sliderStates.interval.value, runGenerationCallback])

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
        sliderStates={sliderStates} />
    </main>
  )
}

const Title = props => (
    <main id="main5" style={props.mainStyle}>
      <h1 className="main--title">Hello Everyone!</h1>
    </main>)

//load the main version corresponding to props.mainVersion
//0 (default) means most recent
const MainVersions = [
  Title,
  Main1,
  Main2,
  Main3,
  Main4,
  Main5
]
export default MainVersions
