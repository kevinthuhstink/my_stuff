import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Navbar, Footer } from './fixed_divs.js';
import { Header, Main } from './StaticPage.js';
import './StaticPage.css'
//import one thing at a time ( put em in a list )

/* creating custom components
 * is used with functions rather than with const or vars
function Main() {
  //const _msg = Sayhi( "HIIIIIIIIII" );
  //console.log( _msg );
	return (
		<div className='main'>
      <h1>Kevin Cheng (KC, kevinthuhstink)</h1>
      <img className="reactlogo" src="./logo512.png" alt="please dont break" />
      <ul>
        <li>This is my first website</li>
        <li>I can't believe this is actually happening</li>
        <li>Jin likes staying healthy</li>
        <li>Maintained with alcohol and strong responsibility</li>
      </ul>
    </div>
  );
}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
//ReactDOM.render( navbar, document.getElementById( 'root' ) ); old react 17
//root.render( navbar ); //root "decides" to render one thing
//root.append( navbar );

//the reactDOM's job is to take unrecognizeable html tags and convert them into a website
//therefore things like .append() in standard JS is kind of unusable
//cause the html is precompiled to JSX and instead of appending website,
//it appends the actual JSX objects
//functions are called with <F /> and have to start with capitals
root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
);
