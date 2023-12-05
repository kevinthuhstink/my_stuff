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
   * Parts include:
   *   Three dots to represent the popup menu when closed
   *   The popup menu has to stay there unless clicked off
   *   Display old variants of the page onclick
   * The sidebar determines which main gets rendered on screen
   * want the div to be able to move left and right, not up and down using the dragger
   * have the resizer follow the mouse, set state based on its xcoord,
   * then have the Main and Sidebar divs follow it */
  React.useEffect(
    function() {
      if ( !fakeFormData.submit )
        return; //do nothing if we're on the fake form screen

      //call movement functions on mouse down
      const resizerObj = document.getElementById( "resizer" );
      resizerObj.addEventListener( "mousedown", dragResizer );
      window.addEventListener( "resize", null );

      //kill event listeners when we exit page
      return ( function() {
        resizerObj.removeEventListener( "mousedown", dragResizer );
      } );

      //drag and move sidebar on mousedown
      function dragResizer( event ) {
        //have it on document so the resizer div follows the mouse anywhere in the document
        event.preventDefault(); //just good to have i guess
        document.addEventListener( "mousemove", moveOnDrag );
        document.addEventListener( "mouseup", stopDrag );

        function moveOnDrag( event ) {
          //have the div follow the mouse while updating state
          const viewWidth = window.innerWidth;
          var newPos = window.event.screenX;
          //stop movement if mouse pos is outside 60% and 80% of the screen
          if ( newPos < viewWidth * .6 || newPos > viewWidth * .8 )
            return;
          //convert from px to vw
          var vwPos = newPos * 100 / viewWidth;
          setPageStyle( prevpageStyle => ( {
              ...prevpageStyle,
              mainWidth: vwPos,
              sidebarWidth: 100 - vwPos,
            } )
          );
        }
        function stopDrag( event ) {
          //kill moving div effects
          document.removeEventListener( "mousemove", moveOnDrag );
          document.removeEventListener( "mouseup", stopDrag );
        }
      }

      //maintain proportions on window resize
    }, [ fakeFormData.submit ]
  );

  //styletools for all Mains
  var Main = MainVersions[pageStyle.mainVersion];
  const mainStyle = {
    background: pageStyle.taro ?
      data.colors.taroMainBackground :
      data.colors.defaultMainBackground,
    width: `${pageStyle.mainWidth}vw`
  }
  var sections = [
    <Header
      taro={pageStyle.taro}
      title={fakeFormData.KC}
      selectMainVersion={selectMainVersion}
      key={0} />,
    <Main
      renderEffect={fakeFormData.submit}
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
