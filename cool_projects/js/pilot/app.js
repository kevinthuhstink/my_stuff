const fs = require('fs')
const express = require('express')
const app = express()
/* useful methods:
 * app.get/post/put/delete (HTTP methods)
 * app.all
 * app.use
 * app.listen
 */

const homePage = fs.readFileSync('./index.html')

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html' })
  res.status(200).send(homePage)
})
app.get('/raw', (req, res) => {
  res.set({ 'Content-Type': 'text/plain' })
  res.status(200).send(homePage)
})
//if the previous pages weren't hit, send this instead
app.all('*', (req, res) =>
  res.status(404).send('new content coming soon'))

app.listen(4000, () => console.log('LOCALHOST 4K'))
