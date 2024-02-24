import React from 'react'
import donut from './img/donut.gif'
import IncrementerButton from './IncrementerButton.js'

export default function Form( props ) {

  const [APIData, setAPIData] = React.useState( {
    usrIn: "",
    img: null,
    textOut: "",
  } )

  React.useEffect(() => {
      //fulfill case: fetch verse APIData and put json into APIData.verse
      function fetchBible_fulfill(call) {
        call.json().then(callData =>
          setAPIData(prevData => ({
            ...prevData,
            verse: callData
          }))
        )
      }

      fetch("https://jsonplaceholder.typicode.com/posts").then(
        fetchBible_fulfill,
        //reject case: instantialize APIData with null (unable to connect)
        prevData => setAPIData({
          ...prevData,
          verse: null,
        })
      ) //end fetch.then
    }, [])

  function bibleVerse() {
    if ( APIData.verse === null )
      return "Could not fetch Bible verse"
    //calc a random int from 0 to 100 and display that
    const rand = Math.floor(Math.random() * 100)
    return APIData.verse[rand].title
  }

  //make sure either text or img is displayed at one time, never both
  function out( event ) {
    event.preventDefault()
    var setText, setImg
    switch (APIData.usrIn) {
      case ("donut"):
        setText = ""
        setImg = donut
        break
      default:
        setText = bibleVerse()
        setImg = null
        break
    }
    setAPIData(prevData => ({
      ...prevData,
      img: setImg,
      textOut: setText
    }))
  }

  function handleTextInput(event) {
    const {name, value} = event.target
    setAPIData(prev => ({
      ...prev,
      [name] : value
    } ) )
  }

  const [incrementerValue, setIncrementerValue] = React.useState("")
  const onIncrement = () => setIncrementerValue(
    incrementerValue === "" ? 1 : prevValue => prevValue + 1)

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
        <button className="usr--button" onClick={out} style={props.buttonStyle}></button>
        <IncrementerButton
          handleIncrement={onIncrement}
          value={incrementerValue}
          buttonStyle={props.buttonStyle} />
      </form>

      <div className="usr--out">
        { APIData.img ?
          <div className="donut--out">
            <img className="donut--gif" src={APIData.img} alt="" />
            <p className="donut--text">rotating<br/>donut</p>
          </div> :
          <p className="out--text">{APIData.textOut}</p> }
      </div>
    </div>
  )
}
