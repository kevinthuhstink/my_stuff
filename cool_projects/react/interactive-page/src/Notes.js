import React from 'react'
import Showdown from 'showdown'

//TODO: bolding, italics, underline
function FileMenu( props ) {
  const [ settings, setSettings, content ] = props.control;
  var { resizerPos, titles, fileNum } = settings;
  const menuStyle = {
    width: resizerPos,
  };

  function addNote() {
    content.current.push( "" );
    setSettings( prevSettings => {
      const newTitles = [...prevSettings.titles];
      newTitles.push( `untitled ${fileNum}` );
      const newTabbar = [...prevSettings.tabbar];
      newTabbar.push( content.current.length );
      return {
        ...prevSettings,
        titles: newTitles,
        tabbar: newTabbar,
        fileNum: prevSettings.fileNum + 1,
        activeNote: prevSettings.activeNote === null ? 0 : prevSettings.activeNote,
      };
    } );
  }

  const deleteNote = React.useCallback( function( ind ) {
    const newNotes = content.current.slice( 0, ind ).concat( content.current.slice( ind + 1 ) );
    content.current = newNotes;
    setSettings( prevSettings => {
      const newTitles = prevSettings.titles.slice( 0, ind ).concat( prevSettings.titles.slice( ind + 1 ) );
      const findInd = prevSettings.tabbar.indexOf( ind );
      var newTabbar = prevSettings.tabbar;
      if ( findInd !== -1 )
        newTabbar = prevSettings.titles.slice( 0, findInd ).concat( prevSettings.titles.slice( findInd + 1 ) );
      return {
        ...prevSettings,
        titles: newTitles,
        tabbar: newTabbar,
        activeNote: ind === prevSettings.activeNote ? null : prevSettings.activeNote,
      }
    } );
  }, [ setSettings, content ] );

  const files = React.useMemo( () => {
    const init = [];
    for ( let i = 0; i < titles.length; i++ )
      init.push( 
        <div className="file--container">
          <p className="notes--file" key={i}>
            {titles[i]}
          </p>
          <button onClick={() => deleteNote(i)}>X</button>
        </div> );
    return init;
  }, [ titles, deleteNote ] );

  const editFilename = React.useCallback( function( event ) {
    //1. replace the file name with a text input
    const element = event.target;
    const field = document.createElement( "input" );
    field.type = "text";
    field.className = "rename--field";
    field.value = element.textContent;
    const fileList = element.parentNode;
    fileList.replaceChild( field, element );
    field.addEventListener( "blur", stopEdit );
    field.focus();

    //2. change the filename when completed
    function stopEdit( event ) {
      field.removeEventListener( "blur", stopEdit );
      fileList.replaceChild( element, field );
      setSettings( prevSettings => {
        const ind = prevSettings.titles.indexOf( element.textContent );
        const newTitles = [...titles];
        newTitles[ind] = field.value;
        return {
          ...prevSettings,
          titles: newTitles,
        };
      } );
    }
  }, [ setSettings, titles ] );

  React.useEffect( () => {
    const domFiles = Array.from( document.getElementsByClassName( "file--container" ) );
    domFiles.forEach( file => file.addEventListener( "dblclick", editFilename ) );
    return () => domFiles.forEach( file => file.removeEventListener( "dblclick", editFilename ) );
  }, [ files, editFilename ] );

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
  const { displayText, titles, activeNote, inputStyle, tabbar } = settings;

  //displays each open tab
  function NotesTabbar( props ) {

    function NotesTab( props ) {
      const tabStyle = {
        background: props.listId === activeNote ?
          "gray" :
          "lightgray",
        color: props.listId === activeNote ?
          "white" :
          "black",
      }

      function loadNote( ind ) {
        setSettings( prevSettings => ( {
          ...prevSettings,
          activeNote: ind,
        } ) );
      }

      return (
        <div className="notes--tab" onClick={() => loadNote(props.listId)} style={tabStyle}>
          {titles[props.listId]}
        </div>
      )
    }

    const openTabs = [];
    for ( let ind in tabbar )
      openTabs.push( <NotesTab key={ind} listId={ind} /> );

    return (
      <div id="notes--tabbar">
        { openTabs }
      </div>
    )
  }

  function NotesPanel() {
    const boldStyle = {
      background: inputStyle.fontWeight ? "#222222" : null,
      color: inputStyle.fontWeight ? "white" : null,
    }
    const italicStyle = {
      background: inputStyle.fontStyle ? "#222222" : null,
      color: inputStyle.fontStyle ? "white" : null,
    }
    const underlineStyle = {
      background: inputStyle.textDecoration ? "#222222" : null,
      color: inputStyle.fontWeight ? "white" : null,
    }
    function setInputStyle( event ) {
      var { name, value } = event.target;
      if ( name === "fontWeight" )
        value = value !== null ? null : "bold";
      else if ( name === "fontStyle" )
        value = value !== null ? null : "italic";
      else if ( name === "textDecoration" )
        value = value !== null ? null : "underline";
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
          <button id="notes--bold" name="fontWeight" onChange={setInputStyle} style={boldStyle}>B</button>
          <button id="notes--italic" name="fontStyle" onChange={setInputStyle} style={italicStyle}>I</button>
          <button id="notes--underline" name="textDecoration" onChange={setInputStyle} style={underlineStyle}>U</button>
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
      { content.current.length !== 0 ?
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
