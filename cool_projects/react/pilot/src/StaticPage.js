import React from 'react';
import Nerv from './img/nerv.png'
//import ReactDOM from 'react-dom/client';

/* requirements for css styling
 * nav need to cover around 15% of the page statically
 * contains an eva png cause its kc's page
 * kevinthuhstink in bold (custom imported) font
 * on the other side of the nav, say:
 *  "First Steps in React Web Dev"
 *
 * next steps:
 * underneath the nav bar have a menu
 * going to different sections of the website
 */
function Header() {
  //dysfunctional png
  //<img className="nervIcon" src={Nerv} alt="" />
  return (
    <nav>
      <h1>kevinthuhstink</h1>
      <p className="navText">
        First Steps in React Web Dev
      </p>
    </nav>
  )
}

/* For now, let it be a static website
 * containing a to do list of languages to learn
 */
function TodoListComponent() {
  return (
    <div className="TodoMain">
      <h1>Resume Stacking</h1>
      <small>Ignore what I already know, here's what's coming next</small>
      <ol id="TodoList">
        <li>React JS</li>
        <li>Bootstrap</li>
        <li>NodeJS</li>
        <li>MySQL</li>
        <li>Git</li>
        <li>Rest/JSON API</li>
        <li>AWS/Google Cloud</li>
      </ol>
    </div>
  )
}

/* Have a picture of the NERV logo on the background
 * make sure it's huge
 */
function NervBackground() {
  return (
    <div className="nervBackground">
      <img src={Nerv} alt="" />
    </div>
  )
}

function Main() {
  return (
    <main>
      <TodoListComponent />
      <NervBackground />
    </main>
  )
}

export { Header, Main };
