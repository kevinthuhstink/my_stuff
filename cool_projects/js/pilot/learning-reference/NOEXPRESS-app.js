const http = require('http')
const fs = require('fs')
//const express = require('express')

//grab the contents of index.html
//readFileSync here is okay because this is only invoked once on startup
//and not after users send requests into the server
const homePage = fs.readFileSync('./index.html')
/* required if the server wants to serve actual designs
 * the html file pulls refs from what the server provided for it
 * const styles = fs.readFileSync('./styles.css')
 * const js = fs.readFileSync('./browser-app.js') */

//callbacks whenever any user hits the server
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.writeHead(200, {
      'content-type': 'text/html'})
    res.write(homePage)
    res.end()
  }
  //have to set up resources for styles.css, browser-app.js...
  //every file so that index.html can load properly
  else if (url === '/raw') {
    res.writeHead(200, {
      'content-type': 'text/plain'})
    res.write(homePage)
    res.end()
  }
  else {
    res.writeHead(404, {
      'content-type': 'text/html' })
    res.write('<h1>Error 404: page not found</h1>')
    res.end()
  }
})
server.listen(4000)
