import React from 'react'
import Cardbar from './Cardbar.js'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <small className="proj">Project 1</small>
      <h1 className="sidebar--title">TODO:</h1>
      <ol className="sidebar--todo">
        <li>React JS</li>
        <li>Bootstrap</li>
        <li>NodeJS</li>
        <li>MySQL</li>
        <li>Git</li>
        <li>Leetcode 75</li>
        <li>Rest/JSON API</li>
        <li>AWS/Google Cloud</li>
        <li>Self-Study Projects</li>
        <li>Freelance Work</li>
      </ol>
      <small className="proj">Project 2</small>
      <Cardbar />
    </div>
  )
}
