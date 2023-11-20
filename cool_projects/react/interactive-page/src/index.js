import React from 'react';
import Sidebar from './Sidebar.js';
import Form from './Form.js'
import FakeLogin from './FakeLogin.js'
import ReactDOM from 'react-dom/client';
import './styles.css';
import _icons from './data.js'


function Header( props ) {
  const _imgs = _icons.icons;
  //instance of an incrementer "class"
  /*
  const inc = ( function() {
    let num = 0;
    //cycle num mod len
    return () => ++num % _imgs.length;
  } )(); */

  //the incrementer "class" is mad unreliable
  const [ icon, setIcon ] = React.useState( 0 );
  function cycleIcon() {
    setIcon( num => num + 1 );
  }

  const styles = {
    background: props.taro ?
      "linear-gradient( 30deg, #b3baff 40%, #333399 100% )" :
      "linear-gradient( 120deg, indigo 40%, navy 100% )",
  }
  //colors is used for subdivs
  const colors = {
    color: props.taro ?
      "black" :
      "white",
  }

  return (
    <header style={styles}>
      <img className="header--img"
           onClick={cycleIcon}
           src={ _imgs[ icon % _imgs.length ]._src } alt='' />
        <h1 className="header--title" style={colors}>
          { props.title ?
            "kevinthuhstink" :
            "Kevin Cheng" }
        </h1>
      <p className="header--desc" style={colors}>React Project 3: My first interactive web site</p>
    </header>
  )
}

function Main( props ) {
  const styles = {
    background: props.taro ?
      "linear-gradient( 120deg, #e6eaff 30%, white 100% )" :
      "linear-gradient( 120deg, Lavender, LavenderBlush )",
  }
  const colors = { //colors prop can be sent down multiple layers
    background: props.taro ?
      "linear-gradient( 30deg, #b3baff 40%, #333399 100% )" :
      "linear-gradient( 120deg, indigo 40%, navy 100% )",
  }
  const textColors = {
    color: props.taro ?
      "black" :
      "white"
  }

  return (
    <main style={styles}>
      <h1 className="main--title">Generate Bible Verse</h1>
      <Form colors={colors} textColors={textColors} />
    </main>
  )
}


/* PROJECT 3.2
 * want a fake login screen to pop up
 * grab user input
 * then send it to the main kevinthuhstink page
 * display that information in the sidebar
 */
function Page() {
  //taro can be toggled on or off
  const [ taro, setTaro ] = React.useState( false );
  function colorsToggle() {
    setTaro( prev => !prev );
  }
  //apply that toggle onto the colorschemes

  const [ fakeFormData, setFakeFormData ] = React.useState(
    {
      username: "",
      password: "",
      passwordConfirm: "",
      KC: false,
      submit: false
    } );

  //const formStyles

  function handleChange( event ) {
    setFakeFormData( function( prevData ) {
      const { name, value, type, checked } = event.target;
      return ( {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      } );
    } )
  } //end handleChange

  function handleSubmit( submit ) {
    submit.preventDefault();
    //retake form
    if ( fakeFormData.submit ) {
      setFakeFormData( {
        username: "",
        password: "",
        passwordConfirm: "",
        KC: false,
        submit: false
      } );
    }
    //submit form IF passwords match
  
    else if ( fakeFormData.passwordConfirm === fakeFormData.password ) {
      console.log( "Successfully signed up" );
      setFakeFormData( function( prevData ) {
        return ( {
          ...prevData,
          submit: true
        } );
      } );
    } //endif
    // 3.2.1 ERROR MESSAGE IF PASSWORDS DONT MATCH
    else {
      console.log( "Passwords do not match" );
    }
  } //end handleSubmit

  var sections = [
    <Header taro={taro} title={fakeFormData.KC} />,
    <Main taro={taro} />,
    <Sidebar taro={taro} formData={fakeFormData} retakeForm={handleSubmit} colorsToggle={colorsToggle} /> //send toggler to colorscheme button
  ]; //end taro colorscheme

  //on fake form submission, load {sections}
  return (
    <div className="page">
      { !fakeFormData.submit ?
          <FakeLogin data={fakeFormData} handleChange={handleChange} handleSubmit={handleSubmit} /> :
          sections }
    </div>
  )
  //{sections}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
