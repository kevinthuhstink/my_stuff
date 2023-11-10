import React from 'react'
import donut from './img/donut.gif'

//the actual user responsive portion of the page
/* what we want is for textGen to display a spinning donut on "donut"
 * or whatever other ASCII art I feel like displaying
 * and for textGen to seed random with whatever other input is given
 * and generate a wall of text
 */
export default function Form() {
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

  const [ data, setData ] = React.useState( {
    img: "",
    text: ""
  });
  //make sure either text or img is displayed at one time, never both
  function getText() {
    setData( prev => ( { //dunno why the parens are necessary but sure
      ...prev,
      img : donut
    } ) );
  }

  const [ clicky, setClicky ] = React.useState( "" );
  function onClicky() {
    let isClicked = clicky === "";
    setClicky( isClicked ? 1 : num => num + 1 );
  }

  return (
    <div className="form"> 
      <input type="text" placeholder="Random seed" className="usr--in"/>
      <button onClick={getText} className="usr--button">Grab random wall of text</button>
      <div className="usr--clicky" onClick={onClicky}>
        <p className="display--clicky">{clicky}</p>
      </div>
      <div className="usr--out">
        <p className="out--text">{data.text}</p>
        <img className="out--img" src={data.img} alt="" />
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
   *
   */
}
