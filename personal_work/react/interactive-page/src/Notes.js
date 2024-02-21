import React from 'react'
import Showdown from 'showdown'

function FileMenu(props) {
  const [settings, setSettings, content] = props.control;
  var {resizerPos, titles, fileNum} = settings;
  const menuStyle = {
    width: resizerPos,
  };

  function addNote() {
    content.current.push("");
    setSettings(prevSettings => {
      const newTabbar = [...prevSettings.tabbar];
      newTabbar.push(content.current.length - 1);
      const newTitles = [...prevSettings.titles];
      newTitles.push(`untitled ${fileNum}`);
      var newActiveNote = prevSettings.activeNote;
      if (prevSettings.activeNote === null)
        newActiveNote = newTabbar[0];
      return {
        ...prevSettings,
        titles: newTitles,
        tabbar: newTabbar,
        fileNum: prevSettings.fileNum + 1,
        activeNote: newActiveNote,
      };
    });
  }

  //removes the note, its title, and index from tabbar
  const deleteNote = React.useCallback(ind => {
    const newNotes = content.current.slice(0, ind)
      .concat(content.current.slice(ind + 1));
    content.current = newNotes;

    setSettings(prevSettings => {
      const {titles, tabbar} = prevSettings;
      const newTitles = titles.slice(0, ind)
        .concat(titles.slice(ind + 1));
      const findInd = tabbar.indexOf(ind);
      var newTabbar = tabbar;
      if (findInd !== -1)
        newTabbar = tabbar.slice(0, findInd)
          .concat(tabbar.slice(findInd + 1));
      for (let i = 0; i < newTabbar.length; i++)
        if (newTabbar[i] > ind)
          newTabbar[i]--; //index correction

      return {
        ...prevSettings,
        titles: newTitles,
        tabbar: newTabbar,
      };
    } );
  }, [setSettings, content]);

  const files = React.useMemo(() => {
    const init = [];
    for (let i = 0; i < titles.length; i++)
      init.push(
        <div key={i} className="file--container">
          <p className="notes--file">
            {titles[i]}
          </p>
          <button onClick={() => deleteNote(i)}>X</button>
        </div> );
    return init;
  }, [titles, deleteNote]);

  const editFilename = React.useCallback(event => {
    //1. replace the file name with a text input
    const element = event.target;
    const field = document.createElement("input");
    field.type = "text";
    field.className = "rename--field";
    field.value = element.textContent;
    const fileList = element.parentNode;
    fileList.replaceChild(field, element);
    field.addEventListener("blur", stopEdit);
    field.addEventListener("keyup", stopEdit);
    field.focus();

    //2. change the filename when completed
    function stopEdit(event) {
      event.preventDefault();
      if (event.type === "keyup" && event.keyCode !== 13)
        return; //do nothing on other key presses
      field.removeEventListener("blur", stopEdit);
      fileList.replaceChild(element, field);
      setSettings(prevSettings => {
        const ind = prevSettings.titles.indexOf(element.textContent);
        const newTitles = [...titles];
        newTitles[ind] = field.value;
        return {
          ...prevSettings,
          titles: newTitles,
        };
      });
    }
  }, [setSettings, titles]);

  const addToTabbar = React.useCallback(event => {
    const element = event.target;
    setSettings(prevSettings => {
      const ind = prevSettings.titles.indexOf(element.textContent);
      if (prevSettings.tabbar.indexOf(ind) === -1)
        //if not in tabbar, put in tabbar
        prevSettings.tabbar.push(ind);
      return {
        ...prevSettings,
        tabbar: prevSettings.tabbar,
        activeNote: ind,
      };
    });
  }, [setSettings]);

  React.useEffect(() => {
    const domFiles =
      Array.from(document.getElementsByClassName("notes--file"));
    domFiles.forEach(file => {
      file.addEventListener("dblclick", editFilename);
      file.addEventListener("click", addToTabbar);
    });
    return () => domFiles.forEach(file => {
      file.removeEventListener("dblclick", editFilename);
      file.removeEventListener("click", addToTabbar);
    });
  }, [files, editFilename, addToTabbar]);

  return (
    <div id="notes--menu" style={menuStyle}>
      <details>
        <summary>All Files</summary>
        {files}
      </details>
      <button onClick={addNote}>+</button>
    </div>
  );
}

function NotesEntry(props) {
  const [settings, setSettings, content] = props.control;
  const {displayText, titles, activeNote, inputStyle, tabbar} = settings;

  //displays each open tab
  function NotesTabbar(props) {
    function NotesTab(props) {
      const id = props.listId;
      const tabStyle = {
        background: id === activeNote ?
          "gray" : "lightgray",
        color: id === activeNote ?
          "white" : "black",
      }

      function loadNote() {
        setSettings(prevSettings => ({
          ...prevSettings,
          activeNote: id,
        }));
        console.log(id, tabbar);
      }

      function removeFromTabbar() {
        setSettings(prevSettings => {
          const prevTabbar = prevSettings.tabbar;
          const tabbarInd = prevTabbar.indexOf(id);
          const newTabbar = prevTabbar.slice(0, tabbarInd)
            .concat(prevTabbar.slice(tabbarInd + 1));
          return {
            ...prevSettings,
            tabbar: newTabbar,
            activeNote: newTabbar.length ? prevSettings.activeNote : null,
          };
        });
      }

      return (
        <div className="notes--tab"
          onClick={loadNote} style={tabStyle}>
          {titles[id]}
          <button onClick={removeFromTabbar}>X</button>
        </div>
      )
    }

    //tabbar contains a list of content.current array access indices
    const openTabs = tabbar.map(ind => <NotesTab key={ind} listId={ind} />);
    return (
      <div id="notes--tabbar">
        {openTabs}
      </div>
    )
  }

  function ButtonPanel() {
    function buttonStyle(name) {
      return {
        background: inputStyle[name] ? "#444444" : null,
        color: inputStyle[name] ? "white" : null,
      };
    }

    function setInputStyle( event ) {
      var {name, value} = event.target;
      setSettings(prevData => {
        if (prevData.inputStyle[name] === null) {
          if (name === "fontWeight")
            value = "bold";
          else if (name === "fontStyle")
            value = "italic";
          else if (name === "textDecoration")
            value = "underline";
        }
        return {
          ...prevData,
          inputStyle: {
            ...prevData.inputStyle,
            [name]: value,
          }
        }
      });
    }

    function toggleMarkdown() {
      setSettings(prevData => {
        if (prevData.displayText) {
          return {
            ...prevData,
            displayText: ""
          };
        }
        const converter = new Showdown.Converter();
        const htmlText = converter.makeHtml(content.current[activeNote]);
        return {
          ...prevData,
          displayText: htmlText,
        };
      } );
    }

    return (
      <div id="notes--panel">
        <button onClick={() => toggleMarkdown(setSettings)}>
          {displayText ? "Edit Note" : "Display Markdown"}
        </button>
        <div id="notes--textoptions">
          <button
            id="notes--bold"
            name="fontWeight"
            onClick={setInputStyle}
            style={buttonStyle("fontWeight")}>B</button>
          <button
            id="notes--italic"
            name="fontStyle"
            onClick={setInputStyle}
            style={buttonStyle("fontStyle")}>I</button>
          <button
            id="notes--underline"
            name="textDecoration"
            onClick={setInputStyle}
            style={buttonStyle("textDecoration")}>U</button>
        </div>
        <div>
          <label htmlFor="notes--fontsize">Font Size</label>
          <select
            name="fontSize"
            id="notes--fontsize"
            onChange={setInputStyle}
            value={inputStyle.fontSize}>
            <option value="7px">7</option>
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="24px">24</option>
          </select>
        </div>
        <div>
          <label htmlFor="notes--fonttype">Font Type</label>
          <select
            name="fontFamily"
            id="notes--fonttype"
            onChange={setInputStyle}
            value={inputStyle.fontFamily}>
            <option value="monospace">Monospace Font</option>
            <option value="Roboto Slab">Roboto Slab</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
      </div>
    );
  }

  function NotesTextarea(props) {
    function handleText(event) {
      const value = event.target.textContent;
      content.current[activeNote] = value;
      //console.log("localStorage rewrite");
      localStorage.setItem("notes", JSON.stringify(content.current));
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
      {activeNote !== null ?
        <>
          <NotesTabbar />
          <ButtonPanel />
          {displayText ?
            <div
              id="notes--markdown"
              dangerouslySetInnerHTML={{__html: displayText}}
            /> :
            <NotesTextarea />}
        </> :
        <div id="notes--inactive">No notes open currently.</div>}
    </section>
  );
}

export default function Notes(props) {
  const setSettings = props.control[1];
  var NotesResizer = () => <div id="notes--resizer" draggable="true" />;

  function initResizer() {
    const notesResizerObj = document.getElementById("notes--resizer");
    notesResizerObj.addEventListener("mousedown", handleResize);

    function handleResize(event) {
      event.preventDefault();
      document.addEventListener("mousemove", moveResizer);
      document.addEventListener("mouseup", stopResize);
      console.log("mousedown");

      function moveResizer(event) {
        event.preventDefault();
        const xpos = event.clientX;
        const notesElement = document.getElementById("notes");
        const {left, width} = notesElement.getBoundingClientRect();
        const newPos = (xpos - left) / width;
        if (newPos < .1 || newPos > .4)
          return;
        const pxWidth = newPos * width;

        setSettings(prevValue => ({
          ...prevValue,
          resizerPos: pxWidth,
        }));
      }

      function stopResize(event) {
        event.preventDefault();
        document.removeEventListener("mousemove", moveResizer);
        document.removeEventListener("mouseup", stopResize);
        console.log("end move");
      }
    }
    return () => notesResizerObj.removeEventListener("mousedown", handleResize);
  }
  React.useEffect(initResizer, [setSettings]);

  return (
    <div id="notes">
      <FileMenu control={props.control} />
      <NotesResizer />
      <NotesEntry control={props.control} />
    </div>
  );
}
