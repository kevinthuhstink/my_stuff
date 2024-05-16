import React from 'react'
import donut from '../img/donut.gif'
import IncrementerButton from './IncrementerButton.js'
import FormOutput from './FormOutput.js'

export default function Form(props) {

  const [APIData, setAPIData] = React.useState({
    usrIn: "",
    img: null,
    textOut: "",
  })

  //grabs random text from an API call
  React.useEffect(() => {
    function APICallFulfill(call) {
      call.json().then(callData =>
        setAPIData(prevData => ({
          ...prevData,
          data: callData
        }))
      )
    }
    function APICallReject() {
      setAPIData(prevData => ({
        ...prevData,
        data: null,
      }))
    }
    fetch("https://jsonplaceholder.typicode.com/posts").then(
      APICallFulfill, APICallReject) //end fetch.then
  }, [])

  function textOutput() {
    if (APIData.data === null)
      return "Could not fetch text"
    //calc a random int from 0 to 100 and display that text
    const rand = Math.floor(Math.random() * 100)
    return APIData.data[rand].title
  }

  //make sure either text or img is displayed at one time, never both
  function formOutput(event) {
    event.preventDefault()
    switch (APIData.usrIn) {
      case ("donut"):
        setAPIData(prevData => ({
          ...prevData,
          img: donut
        }))
        break
      default:
        setAPIData(prevData => ({
          ...prevData,
          img: null,
          textOut: textOutput()
        }))
        break
    }
  }

  function handleTextInput(event) {
    const {name, value} = event.target
    setAPIData(prev => ({
      ...prev,
      [name] : value
    }))
  }

  const [incrementerValue, setIncrementerValue] = React.useState("")
  const onIncrement = () => setIncrementerValue(prevValue =>
    prevValue === "" ? 1 : prevValue + 1)

  return (
    <div className="form--body">
      <form>
        <input
          type="text"
          placeholder="Random seed"
          className="usr--in"
          onChange={handleTextInput}
          name="usrIn"
          value={APIData.usrIn} />
        <button className="usr--button" onClick={formOutput} style={props.buttonStyle} />
        <IncrementerButton
          handleIncrement={onIncrement}
          count={incrementerValue}
          buttonStyle={props.buttonStyle} />
      </form>
      <FormOutput image={APIData.img} textOut={APIData.textOut} />
    </div>
  )
}
