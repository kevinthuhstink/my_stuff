import React from 'react'
import Showdown from 'showdown'

//TODO: multiple note entries
//      extra options for the text editor (bold, italic...)

function NotesMenu( props ) {
  const [ notesData ] = props.control;
  const { resizerPos } = notesData;
  const menuStyle = {
    width: resizerPos,
  };
  return (
    <details id="notes--menu" style={menuStyle}>
      <summary>Notes</summary>
    </details>
  ); //stick <p>s inside
}


//for now notesEntry contains an object with text
function NotesEntry( props ) {
  const [ notesData, setNotesData, textRef ] = props.control;
  const { displayText, inputStyle } = notesData;

  function NotesTabbar( props ) {
    //display each open tab
    function NotesTab( props ) {
      return (
        <div className="notes--tab">
        </div>
      )
    }

    return (
      <div id="notes--tabbar">
      </div>
    )
  }

  function NotesPanel() {

    function setInputStyle( event ) {
      const { name, value } = event.target;
      setNotesData( prevData => ( {
        ...prevData,
        inputStyle: {
          ...prevData.inputStyle,
          [name]: value,
        }
      } ) );
    }

    function toggleMarkdown() {
      setNotesData( prevData => {
        if ( prevData.displayText ) {
          return {
            ...prevData,
            displayText: ""
          };
        }
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml( textRef.current );
        return {
          ...prevData,
          displayText: htmlText,
        };
      } );
    }

    return (
      <div id="notes--panel">
        <button onClick={() => toggleMarkdown( setNotesData )}>
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
      textRef.current = value;
      //console.log( value );
    }

    return (
      <div
        id="notes--input"
        contentEditable="true"
        style={inputStyle}
        onInput={handleText}>
        {textRef.current}
      </div>
    );
  }

  return (
    <section id="notes--main">
      <NotesTabbar />
      <NotesPanel />
      { displayText ?
        <div id="notes--markdown" dangerouslySetInnerHTML={{__html: displayText}} /> :
        <NotesTextarea /> }
    </section>
  );
}

export default function Notes( props ) {
  const [ notesData, setNotesData ] = props.control;
  const resizerPos = notesData.resizerPos;
  const NotesResizer = props => <div {...props} id="notes--resizer" draggable="true" />;
  const resizerStyle = {
    left: resizerPos,
  };
  React.useEffect( () => initResizer( setNotesData ), [ setNotesData ] );

  return (
    <div id="notes">
      <NotesMenu control={props.control} />
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
