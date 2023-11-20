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

  const [ data, setData ] = React.useState( {} );
  //fulfill case: fetch verse data and put json into data.APIData
  function fetchBible_fulfill( call ) {
    call.json().then( function( callData ) {
      setData( function() {
        return {
          usrIn: "",
          img: null,
          textOut: "",
          APIData: callData
        };
      } );
    } );
  }

  React.useEffect(
    function() {
      //fetch( "https://bible-api.com/?random=verse" ).then( 
      fetch( "https://bible-api.com/john 3:16" ).then( 
        fetchBible_fulfill,
        //reject case: instantialize APIData with null (unable to connect)
        () => setData( {
          usrIn: "",
          img: null,
          textOut: "",
          APIData: null,
        } )
      ) //end fetch.then
    }, []
  );
  function bibleVerse() {
    if ( data.APIData === null )
      return "Could not fetch Bible verse";
    const setText = data.APIData.text;
    const setReference = data.APIData.reference;
    var quote = `${setReference}\r\n${setText}`;
    return quote;
  }

  //make sure either text or img is displayed at one time, never both
  function out( event ) { 
    event.preventDefault();
    //console.log( formIn.data )
    var setText, setImg;
    switch ( data.usrIn ) {
      case ( "donut" ):
        setText = "";
        setImg = donut;
        break;
      default:
        setText = bibleVerse();
        setImg = null;
        break;
    }
    setData( prev => ( { //dunno why the parens are necessary but sure
      ...prev,
      img: setImg,
      textOut: setText
    } ) );
  }

  function handleChange( event ) {
    const { name, value } = event.target; //destructure for efficiency 
    //name may be a list of inputs so make sure to update all of them
    setData( prev => ( { 
      ...prev,
      [name] : value
    } ) );
  } 

  const [ clicky, setClicky ] = React.useState( "" );
  function onClicky() {
    let isClicked = clicky === "";
    setClicky( isClicked ? 1 : num => num + 1 );
  }

  //try to create dynamic styling
  return (
    <div className="form--body"> 
      <form>
        <input
          type="text"
          placeholder="Random seed"
          className="usr--in"
          onChange={handleChange}
          name="usrIn"
          value={data.usrIn} />
        <button className="usr--button" onClick={out} style={props.colors}></button>
        <div className="usr--clicky" onClick={onClicky} style={props.colors}>
          <p className="display--clicky" style={props.textColors}>{clicky}</p>
        </div>
      </form>
      <div className="usr--out">
        { data.img ? 
          <div className="donut--out">
            <img className="donut--gif" src={data.img} alt="" />
            <p className="donut--text">rotating<br/>donut</p>
          </div> :
          <p className="out--text">{data.textOut}</p> }
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
