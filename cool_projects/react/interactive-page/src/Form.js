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

  //probably not right to have two different state but whatever its good for practice
  const [ formIn, setFormIn ] = React.useState( { data: "" } );
  const [ data, setData ] = React.useState( {
    img: null,
    text: ""
  } );
  //make sure either text or img is displayed at one time, never both
  function getText( event ) { 
    event.preventDefault();
    //console.log( formIn.data )
    if ( formIn.data === "donut" ) {
      setData( prev => ( { //dunno why the parens are necessary but sure
        img : donut,
        text : ""
      } ) );
    }
    else {
      setData( prev => ( { //dunno why the parens are necessary but sure
        img : null,
        text : formIn.data
      } ) );
    }
  }

  function handleChange( event ) {
    const { name, value } = event.target; //destructure for efficiency 
      //name may be a list of inputs so make sure to update those
    setFormIn( { [name] : value } )
    //setFormIn( { [event.target.name] : event.target.value } )
  } //also { data : event.target.value } but this is reusable

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
          name="data"
          value={formIn.data} />
        <button className="usr--button" onClick={getText} style={props.colors}></button>
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
          <p className="out--text">{data.text}</p> }
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
