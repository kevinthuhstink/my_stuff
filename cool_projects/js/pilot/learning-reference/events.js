/* The flow of the program is affected by its execution
 * Register functions that listen for some events to do stuff */
const event = require('events')
const customEmitter = new EventEmitter()

customEmitter.on('response', () => {
  console.log('data received')
})
customEmitter.on('response', () => {
  console.log('other response')
})
customEmitter.emit('response',
