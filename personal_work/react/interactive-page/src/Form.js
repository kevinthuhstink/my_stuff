import React from 'react'
import donut from './img/donut.gif'

//the actual user responsive portion of the page
/* what we want is for textGen to display a spinning donut on "donut"
 * or whatever other ASCII art I feel like displaying
 * and for textGen to seed random with whatever other input is given
 * and generate a wall of text
 */
export default function Form( props ) {
  /*
  function textGen() {
    const donut = "./img/donut.gif";
    console.log( "Button click" );
    return (
      <img className="text--silly" src={donut} alt="donut" />
    )
  }*/

  //const thingArray = [ "Thing 1" ];
  /* things is the array thats being state-tracked
   * set is the watcher-function that updates the component when things is changed
   * set takes one parameter, a function that tells things what to do
   */

  /*
  const [things, set] = React.useState( [ "Thing 1" ] ) //destructuring again
  function newElement() {
    //preventDefault();
    const newText = `Thing ${things.length + 1}`
    set( prev => [ ...prev, newText ] )
    //set( prev => prev.push( newText ) )
    //thingArray.push( newText ) //adds newText into the array
  }
  const thingElements = things.map( i => <li key={i}>{i}</li> ) //oh wow JSX objs can be keys too
  */

  const [APIData, setAPIData] = React.useState( {
    usrIn: "",
    img: null,
    textOut: "",
  } );

  React.useEffect(() => {
      //fetch( "https://bible-api.com/?random=verse" ).then(
      fetch("https://jsonplaceholder.typicode.com/posts").then(
        fetchBible_fulfill,
        //reject case: instantialize APIData with null (unable to connect)
        prevData => setAPIData({
          ...prevData,
          verse: null,
        } )
      ) //end fetch.then

      //fulfill case: fetch verse APIData and put json into APIData.verse
      function fetchBible_fulfill( call ) {
        call.json().then( callData => 
          setAPIData( prevData => ( {
            ...prevData,
            verse: callData
          })));
      }
    }, []);

  function bibleVerse() {
    if ( APIData.verse === null )
      return "Could not fetch Bible verse";
    //calc a random int from 0 to 100 and display that
    const rand = Math.floor(Math.random() * 100);
    return APIData.verse[rand].title;
  }

  //make sure either text or img is displayed at one time, never both
  function out( event ) {
    event.preventDefault();
    var setText, setImg;
    switch ( APIData.usrIn ) {
      case ( "donut" ):
        setText = "";
        setImg = donut;
        break;
      default:
        setText = bibleVerse();
        setImg = null;
        break;
    }
    setAPIData( prevData => ( {
      ...prevData,
      img: setImg,
      textOut: setText
    } ) );
  }

  function handleChange( event ) {
    const { name, value } = event.target; //destructure for efficiency
    //name may be a list of inputs so make sure to update all of them
    setAPIData( prev => ( {
      ...prev,
      [name] : value
    } ) );
  }

  const [ clicky, setClicky ] = React.useState( "" );
  function onClicky() {
    let isClicked = clicky === "";
    setClicky( isClicked ? 1 : num => num + 1 );
  }

  return (
    <div className="form--body">
      <form>
        <input
          type="text"
          placeholder="Random seed"
          className="usr--in"
          onChange={handleChange}
          name="usrIn"
          value={APIData.usrIn} />
        <button className="usr--button" onClick={out} style={props.buttonStyle}></button>
        <div className="usr--clicky" onClick={onClicky} style={props.buttonStyle}>
          <p className="display--clicky" style={props.textColors}>{clicky}</p>
        </div>
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

  /* notes:
   * onClick={newElement()} having the parentheses bugs the shit out of react
   * i guess the parentheses tell react to do the function ? im really unsure tbh
   * button reloads the page cause its within a form and react auto-submits forms on button clicks
   * <form> -> <div className="form"> fixes that, though thats kind of tragic
   * <ul className="things--test">
   * {thingElements}
   * </ul>
   */
}
