import React from 'react'
import Showdown from 'showdown'

//TODO: rename and delete note entries
function FileMenu( props ) {
  const [ settings, setSettings, content ] = props.control;
  var { resizerPos, titles } = settings;
  const menuStyle = {
    width: resizerPos,
  };

  function addNote() {
    content.current.push( "" );
    setSettings( prevSettings => {
      const newTitles = [...prevSettings.titles];
      newTitles.push( `untitled ${content.current.length}` );
      return {
        ...prevSettings,
        titles: newTitles,
        activeNote: prevSettings.activeNote === null ? 0 : prevSettings.activeNote,
      };
    } );
  }

  const files = React.useMemo( () => {
    const init = [];
    for ( let i = 0; i < titles.length; i++ )
      init.push( <p className="notes--file" key={i}>{titles[i]}</p> );
    return init;
  }, [ titles ] );

  function editFile( event ) {
    //1. replace the file name with a text input
    const element = event.target;
    element.addEventListener( "blur", stopEdit );
    const field = document.createElement( "input" );
    field.type = "text";
    field.className = "rename--field";
    const fileList = element.parentNode;
    fileList.replaceChild( field, element );

    function stopEdit( event ) {
      fileList.replaceChild( element, field );
    }
  }

  React.useEffect( () => {
    const domFiles = Array.from( document.getElementsByClassName( "notes--file" ) );
    domFiles.forEach( file => file.addEventListener( "dblclick", editFile ) );
    return () => domFiles.forEach( file => file.removeEventListener( "dblclick", editFile ) );
  }, [ files ] );

  return (
    <div id="notes--menu">
      <details style={menuStyle}>
        <summary>Files</summary>
        {files}
      </details>
      <button onClick={addNote}>+</button>
    </div>
  );
}


function NotesEntry( props ) {
  const [ settings, setSettings, content ] = props.control;
  const { displayText, titles, activeNote, inputStyle } = settings;

  //displays each open tab
  function NotesTabbar( props ) {

    function NotesTab( props ) {
      function loadNote( ind ) {
        setSettings( prevSettings => ( {
          ...prevSettings,
          activeNote: ind,
        } ) );
      }

      return (
        <div onClick={() => loadNote(props.listId)}>
          {titles[props.listId]}
        </div>
      )
    }

    const openTabs = [];
    for ( let i = 0; i < content.current.length; i++ )
      openTabs.push( <NotesTab key={i} listId={i} /> );

    return (
      <div id="notes--tabbar">
        { openTabs }
      </div>
    )
  }

  function NotesPanel() {
    function setInputStyle( event ) {
      const { name, value } = event.target;
      setSettings( prevData => ( {
        ...prevData,
        inputStyle: {
          ...prevData.inputStyle,
          [name]: value,
        }
      } ) );
    }

    function toggleMarkdown() {
      setSettings( prevData => {
        if ( prevData.displayText ) {
          return {
            ...prevData,
            displayText: ""
          };
        }
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml( content.current[activeNote] );
        return {
          ...prevData,
          displayText: htmlText,
        };
      } );
    }

    return (
      <div id="notes--panel">
        <button onClick={() => toggleMarkdown( setSettings )}>
          { displayText ? "Edit Note" : "Display Markdown" }
        </button>
        <div id="notes--textoptions">
          <button name="bold">B</button>
          <button name="italic">I</button>
          <button name="underline">U</button>
        </div>
        <div>
          <label htmlFor="notes--fontsize">Font Size</label>
          <select name="fontSize" id="notes--fontsize" onChange={setInputStyle} value={inputStyle.fontSize} >
            <option value="7px">7</option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="24px">24</option>
          </select>
        </div>
        <div>
          <label htmlFor="notes--fonttype">Font Type</label>
          <select name="fontFamily" id="notes--fonttype" onChange={setInputStyle} value={inputStyle.fontFamily} >
            <option value="monospace">Monospace Font</option>
            <option value="Roboto Slab">Roboto Slab</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>
    );
  }

  function NotesTextarea( props ) {
    /* have to use ref so i don't re-render the textarea
     * however any changes to state auto-rerenders the textarea
     * ex. font size, font family
     * so the text needs to be stored somewhere */
    function handleText( event ) {
      //handles changes to the note
      const value = event.target.textContent;
      content.current[activeNote] = value;
    }

    return (
      <div
        id="notes--input"
        contentEditable="true"
        suppressContentEditableWarning="true"
        style={inputStyle}
        onInput={handleText}>
        {content.current[activeNote]}
      </div>
    );
  }

  return (
    <section id="notes--main">
      { activeNote !== null ?
        <>
          <NotesTabbar />
          <NotesPanel />
          { displayText ?
            <div id="notes--markdown" dangerouslySetInnerHTML={{__html: displayText}} /> :
            <NotesTextarea /> }
        </> :
        <div id="notes--inactive">No notes open currently.</div> }
    </section>
  );
}


export default function Notes( props ) {
  const [ settings, setSettings ] = props.control;
  const resizerPos = settings.resizerPos;
  const NotesResizer = props => <div {...props} id="notes--resizer" draggable="true" />;
  const resizerStyle = {
    left: resizerPos,
  };
  React.useEffect( () => initResizer( setSettings ), [ setSettings ] );

  return (
    <div id="notes">
      <FileMenu control={props.control} />
      <NotesResizer style={resizerStyle} />
      <NotesEntry control={props.control} />
    </div>
  );
}

function initResizer( setValue ) {
  const notesResizerObj = document.getElementById( "notes--resizer" );
  notesResizerObj.addEventListener( "mousedown", handleResize );

  function handleResize( event ) {
    event.preventDefault();
    document.addEventListener( "mousemove", moveResizer );
    document.addEventListener( "mouseup", stopResize );
    console.log( "mousedown" );

    function moveResizer( event ) {
      event.preventDefault();
      const xpos = event.clientX;
      const notesElement = document.getElementById( "notes" );
      const { left, width } = notesElement.getBoundingClientRect();
      const newPos = ( xpos - left ) / width;
      if ( newPos < .1 || newPos > .4 )
        return;
      const pxWidth = newPos * width;

      setValue( prevValue => ( {
        ...prevValue,
        resizerPos: pxWidth,
      } ) );
      console.log( "call resize" );
    }

    function stopResize( event ) {
      event.preventDefault();
      document.removeEventListener( "mousemove", moveResizer );
      document.removeEventListener( "mouseup", stopResize );
    }
  }

  return () => notesResizerObj.removeEventListener( "mousedown", handleResize );
}
