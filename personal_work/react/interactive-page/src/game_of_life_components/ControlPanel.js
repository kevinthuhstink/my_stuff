import {Slider} from '../Slider.js'

export function ControlPanel(props) {
  const [runGeneration, runGame, toggleID, randomGrid, resetInterval] = props.gameFunctions
  const {cellSize, interval} = props.sliderStates
  const buttonColors = props.controlStyle.buttonStyle
  const sliderStyle = { //read only because this affects multiple sliders
    thumbStyle: {
      ...buttonColors,
    }
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
      <Slider sliderData={cellSize} sliderStyle={sliderStyle} />
      <Slider sliderData={interval} sliderStyle={sliderStyle} onChange={resetInterval} />
      <button onClick={randomGrid} style={buttonColors}>
        Set Random Grid
      </button>
    </div>
  )
}
