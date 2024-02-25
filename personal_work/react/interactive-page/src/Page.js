import React from 'react'
import Header from './header_components/Header.js'
import Sidebar from './Sidebar.js'
import FakeLogin from './FakeLogin.js'
import MainVersions from './MainVersions.js'
import data from './data.js'
import './styles.css'

function Resizer(props) {
  var setPosition = {left: `${props.position}vw`}
  return <div id="resizer" draggable="true" style={setPosition}></div>
}


export default function Page() {
  const [pageStyle, setPageStyle] = React.useState(defaultPageStyle)

  function defaultPageStyle() {
    const displaySidebar = window.innerWidth >= 800
    return {
      taro: false,
      mainVersion: 0,
      displaySidebar: displaySidebar,
      mainWidth: displaySidebar ? 70 : 100, //in vw
      sidebarWidth: displaySidebar ? 30 : null,
    }
  }

  function toggleColors() {
    setPageStyle(prevPageStyle => ({
      ...prevPageStyle,
      taro: !prevPageStyle.taro,
    }))
  }

  function selectMainVersion(version) {
    setPageStyle(prevPageStyle => ({
      ...prevPageStyle,
      mainVersion: version,
    }))
  }

  const [fakeFormData, setFakeFormData] = React.useState( {
      username: "",
      password: "",
      passwordConfirm: "",
      KC: false,
      submit: false
    })

  function handleChange(event) {
    setFakeFormData(function(prevData) {
      const {name, value, type, checked} = event.target
      return ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      })
    })
  }

  function handleSubmit(onSubmit) {
    onSubmit.preventDefault()
    //retake form
    if (fakeFormData.submit) {
      setFakeFormData({
        username: "",
        password: "",
        passwordConfirm: "",
        KC: false,
        submit: false
      })
      setPageStyle(defaultPageStyle)
    }

    //submit form IF passwords match
    else if (fakeFormData.passwordConfirm === fakeFormData.password) {
      console.log("Successfully signed up")
      setFakeFormData(function(prevData) {
        return ({
          ...prevData,
          submit: true
        })
      })
    }
    else {
      console.log("Passwords do not match")
    }
  }


  React.useEffect(handleResizer, [fakeFormData.submit, pageStyle.displaySidebar])
  function handleResizer() {
    if (!fakeFormData.submit)
      return //do nothing if we're on the fake form screen

    window.addEventListener('resize', displaySidebar)
    const resizerObj = document.getElementById( "resizer" )
    if (resizerObj)
      resizerObj.addEventListener("mousedown", dragResizer)
    return () => {
      if (resizerObj)
        resizerObj.removeEventListener( "mousedown", dragResizer )
      window.removeEventListener('resize', displaySidebar)
    }

    function displaySidebar(event) {
      event.preventDefault()
      setPageStyle(prevPageStyle => {
        const displaySidebar = window.innerWidth >= 800
        return {
          ...prevPageStyle,
          displaySidebar: displaySidebar,
          mainWidth: displaySidebar ? 70 : 100,
          sidebarWidth: displaySidebar ? 30 : null,
        }
      })
    }

    //drag and move sidebar on mousedown
    function dragResizer(event) {
      //have it on document so the resizer div follows the mouse anywhere in the document
      event.preventDefault() //just good to have i guess
      document.addEventListener("mousemove", moveOnDrag)
      document.addEventListener("mouseup", stopDrag)

      function moveOnDrag(event) {
        const viewWidth = window.innerWidth
        var mousePos = event.clientX
        //stop movement if mouse pos is outside 60% and 80% of the screen
        if (mousePos < viewWidth * .6 || mousePos > viewWidth * .8)
          return
        var newWidth = mousePos * 100 / viewWidth //px -> vw
        setPageStyle(prevpageStyle => ({
          ...prevpageStyle,
          mainWidth: newWidth,
          sidebarWidth: 100 - newWidth,
        }))
      }

      function stopDrag(event) {
        //kill moving div effects
        document.removeEventListener("mousemove", moveOnDrag)
        document.removeEventListener("mouseup", stopDrag)
      }
    }
  }

  const sidebarMessages = [
    "Click on the dotted buttons above to see my development progress.",

    `This was one of my first web development projects in forever.
    I used this page to relearn a lot of CSS that I've long forgotten,
    and learned some new CSS stuff along the way,
    namely flexbox and gradients.`,

    `This was my real first challenge in React. I had to figure out
    what a prop was and how to pass them into reusable components.
    Overall, not too bad, and also good CSS review.`,

    `Certainly a huge step up from the last page.
    Because there's no backend, this form isn't handled in any
    meaningful way, but it still makes API calls, and loads images
    based on what you submit (submit "donut" for a donut).`,

    `Apparently many people's first Javascript final project
    was to code Conway's Game of Life, so here it is, with
    a scalable grid and variable window size. Also, these sliders are
    all completely custom as well.`,

    `As of now, the last thing I've done was include a note-taking app.
    Arguably easier than Conway's Game of Life, however tracking data and
    responding to user input in the textarea was definetly suitable
    practice in Javascript. Unfortunately, I can't get newlines to work.
    Hopefully when I revisit this, I'll improve on it and maybe even
    keep building more.`
  ]


  //styletools for all Mains
  const Main = MainVersions[pageStyle.mainVersion]
  const sidebarText = sidebarMessages[pageStyle.mainVersion]

  const mainStyle = {
    background: pageStyle.taro ?
      data.colors.main.taro :
      data.colors.main.default,
    width: `${pageStyle.mainWidth}vw`,
    buttonStyle: {
      background: pageStyle.taro ?
        data.colors.header.taro :
        data.colors.header.default,
      color: pageStyle.taro ?
        "black" :
        "white",
    },
  }

  //on fake form submission, load {sections}
  return (
    <div className="page">
      { !fakeFormData.submit ?
        <FakeLogin data={fakeFormData} handleChange={handleChange} handleSubmit={handleSubmit} /> :
        <>
          <Header
            taro={pageStyle.taro}
            title={fakeFormData.KC}
            selectMainVersion={selectMainVersion}
            key={0} />
          <Main
            renderEffects={fakeFormData.submit}
            mainStyle={mainStyle}
            pageStyle={pageStyle}
            key={1} />
          { pageStyle.displaySidebar &&
          <>
          <Resizer position={pageStyle.mainWidth}
            key={2} />
          <Sidebar
            pageStyle={pageStyle}
            formData={fakeFormData}
            retakeForm={handleSubmit}
            toggleColors={toggleColors}
            displayText={sidebarText}
            key={3} />
          </>
          }
        </>
       }
    </div>
  )
}
