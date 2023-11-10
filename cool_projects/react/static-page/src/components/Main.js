import React from 'react'
import Cardbar from './Cardbar.js'
import leliel from '../img/leliel.png'

export default function Main() {
  return (
    <main>
      <img className="main--background" src={leliel} alt="" />
      <h1 className="main--title">Second Steps in React Web Dev</h1>
      <p className="main--description">
        Currently following the scrimba tutorial for React by Bob Ziroll.
        If you couldn't tell from the color design, I'm a fan of Evangelion.
        Eventually, this page will replicate the functionality behind the AirBNB
        trip experiences tab, where a bunch of events are pulled from a database and displayed on the website directly instead of requiring individual divs.
      </p>
      <Cardbar />
    </main>
  )
}
