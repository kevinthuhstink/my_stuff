/* Streams are used to read/write information sequentially (fifo pipe)
 * They extend the event API
 * better than read/write into buffers
 * because i/o into large files require a large buffer and lots of memory */
const fs = require('fs')
const os = require('os')
const path = require('path')
const util = require('util')

const filePath = path.join(__dirname, 'large.txt')
async function getLargeFile() {
  const open = util.promisify(fs.open)
  const write = util.promisify(fs.write)
  try {
    const largeFile = await open(filePath, 'ax')
    for (let i = 0; i < 500000; i++)
      fs.write(largeFile, `large file line ${i}\n`, (err, written, string) => {
        if (err) throw err
      })
  } catch (error) {
    const largeFile = await open(filePath, 'r')
    return largeFile
  }
}
module.exports.getLargeFile = getLargeFile

//const file = getLargeFile()
/* const readStream = fs.createReadStream(filePath)
readStream.on('data', result => console.log(result))
readStream.on('error', err => console.log(err)) */
