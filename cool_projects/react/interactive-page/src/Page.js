import React from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import FakeLogin from './FakeLogin.js'
import MainVersions from './MainVersions.js'
import data from './data.js'
import './styles.css';

function Resizer( props ) {
  var setPosition = {
    left: `${props.position}vw` }
  return <div id="resizer" draggable="true" style={setPosition}></div>
}

export default function Page() {
  //pageStyle.taro can be toggled on or off
  //apply it onto the children components
  const [ pageStyle, setPageStyle ] = React.useState( defaultPageStyle );
  function defaultPageStyle() {
    return {
      taro: false,
      mainVersion: 0,
      mainWidth: 70, //in vw
      sidebarWidth: 30,
    };
  }
  function toggleColors() {
    setPageStyle( prevPageStyle => ( {
      ...prevPageStyle,
      taro: !prevPageStyle.taro,
    } ) )
  }
  function selectMainVersion( version ) {
    console.log( version );
    setPageStyle( prevPageStyle => ( {
      ...prevPageStyle,
      mainVersion: version,
    } ) )
  }

  /* PROJECT 3.2
   * want a fake login screen to pop up
   * grab user input
   * then send it to the main kevinthuhstink page
   * display that information in the sidebar
   */
  const [ fakeFormData, setFakeFormData ] = React.useState( {
      username: "",
      password: "",
      passwordConfirm: "",
      KC: false,
      submit: false
    } );

  function handleChange( event ) {
    setFakeFormData( function( prevData ) {
      const { name, value, type, checked } = event.target;
      return ( {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      } );
    } )
  } //end handleChange

  function handleSubmit( onSubmit ) {
    onSubmit.preventDefault();
    //retake form
    if ( fakeFormData.submit ) {
      setFakeFormData( {
        username: "",
        password: "",
        passwordConfirm: "",
        KC: false,
        submit: false
      } );
      setPageStyle( defaultPageStyle );
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
    else {
      console.log( "Passwords do not match" );
    }
  } //end handleSubmit


  /* PROJECT 3.3:
   * Sidebar popup menu and drag resizing
   * Want the div to be able to move left and right, not up and down using the dragger
   * have the resizer follow the mouse, set state based on its xcoord,
   * then have the Main and Sidebar divs follow it */
  React.useEffect( handleResizer, [ fakeFormData.submit ] );
  function handleResizer() {
    if ( !fakeFormData.submit )
      return; //do nothing if we're on the fake form screen

    const resizerObj = document.getElementById( "resizer" );
    resizerObj.addEventListener( "mousedown", dragResizer );
    return () => resizerObj.removeEventListener( "mousedown", dragResizer );

    //drag and move sidebar on mousedown
    function dragResizer( event ) {
      //have it on document so the resizer div follows the mouse anywhere in the document
      event.preventDefault(); //just good to have i guess
      document.addEventListener( "mousemove", moveOnDrag );
      document.addEventListener( "mouseup", stopDrag );

      function moveOnDrag( event ) {
        const viewWidth = window.innerWidth;
        var mousePos = window.event.screenX;
        //stop movement if mouse pos is outside 60% and 80% of the screen
        if ( mousePos < viewWidth * .6 || mousePos > viewWidth * .8 )
          return;
        var newWidth = mousePos * 100 / viewWidth; //px -> vw
        setPageStyle( prevpageStyle => ( {
          ...prevpageStyle,
          mainWidth: newWidth,
          sidebarWidth: 100 - newWidth,
        } ) );
      }

      function stopDrag( event ) {
        //kill moving div effects
        document.removeEventListener( "mousemove", moveOnDrag );
        document.removeEventListener( "mouseup", stopDrag );
      }
    }
  }


  //styletools for all Mains
  var Main = MainVersions[pageStyle.mainVersion];
  const mainStyle = {
    background: pageStyle.taro ?
      data.colors.main.taro :
      data.colors.main.default,
    width: `${pageStyle.mainWidth}vw`,
    buttonStyle: { //doesn't have to be only css styletools
      background: pageStyle.taro ?
        data.colors.header.taro :
        data.colors.header.default,
      color: pageStyle.taro ?
        "black" :
        "white",
    },
  }

  var sections = [
    <Header
      taro={pageStyle.taro}
      title={fakeFormData.KC}
      selectMainVersion={selectMainVersion}
      key={0} />,
    <Main
      renderEffects={fakeFormData.submit}
      mainStyle={mainStyle}
      pageStyle={pageStyle}
      key={1} />,
    <Resizer
      position={pageStyle.mainWidth}
      key={2} />,
    <Sidebar
      pageStyle={pageStyle}
      formData={fakeFormData}
      retakeForm={handleSubmit}
      toggleColors={toggleColors}
      key={3} />,
  ]; //end taro pageStyle

  //on fake form submission, load {sections}
  return (
    <div className="page">
      { !fakeFormData.submit ?
        <FakeLogin data={fakeFormData} handleChange={handleChange} handleSubmit={handleSubmit} /> :
        sections }
    </div>
  )
}
