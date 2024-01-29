/* the event loop runs the immediate code
 *  (ie. top level functions)
 * and then only after those functions are ran,
 * subsequent callbacks and async funcs are finished */

const os = require('os');
const path = require('path');
const fs = require('fs');
const util = require('util');
const buffer = require('buffer');
const myStream = require('./streams.js')

/* async function asyncRead() {
  console.log('start file read');
  return new Promise((resolve, reject) => {
    fs.readFile(__filename, (READ_ERR, data) => {
      if (READ_ERR) throw READ_ERR;
      console.log('file read complete');
      resolve(data);
    });
  }); //Promises are modular and cleaner
}
async function asyncWrite(writebuf) {
  console.log('start file write');
  const data = await writebuf; //just wait for the read to end
  const filedest = path.join(os.tmpdir(), 'dest');
  fs.writeFile(filedest, data, WRITE_ERR => {
    if (WRITE_ERR) throw WRITE_ERR;
  });
  console.log('file write complete');
} */
const asyncRead = util.promisify(fs.readFile); //gah dayum
const asyncWrite = util.promisify(fs.writeFile);
async function asyncrw() {
  try {
    const readData = await asyncRead(__filename);
    const filedest = path.join(os.tmpdir(), 'dest');
    await asyncWrite(filedest, readData);
  } catch (error) {
    console.log('broken promisify');
    throw error
  }
}

myStream.getLargeFile()
const http = require('http');
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'large.txt')
  //const readData = asyncRead(filePath)
  //readData.then(resolve => res.end(resolve))

  const fstream = fs.createReadStream(filePath, 'utf8')
  fstream.on('open', fstream.pipe(res)) //chunked
});
server.listen(5000, () => {
  console.log('Server listening on port : 5000...');
});
