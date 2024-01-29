/* down here in backend, we have no access to
 *  window or document global objects
 * instead, we have access to stuff like
 *  __dirname - path to current dir
 *  __filename - file name
 *  require - function to use modules
 *            NOTE ALSO EXECS FUNCTION CALLS IN THE MODULE
 *            this is because all function calls of the module itself
 *            are included and called within the require() call
 *  module - information about current module
 *  process - info about the environment that the program is being exec'd in
 *            could be in places like React or Perl or other */

const os = require('os'); //information about user's OS
const path = require('path'); //information about directory paths
const fs = require('fs'); //file system control
const Buffer = require('buffer'); //file data i/o use
const http = require('http'); //web server functionality

const user = {
  name: os.type(),
  release: os.release(),
  memory: os.totalmem(),
  cwd: path.parse(__filename),
};
//console.log(process);

/* async js is messy but
 * sync js means one user can bring down the entire server
 * if that user has an exceedingly long request
 * because the server cpu is locked in on handling that request */
const readData = new Promise((resolve, reject) => {
  fs.readFile("mini.js", (err, data) => {
    if (err)
      reject("read failure");
    resolve(data);
  })
});
function readFileFulfill(data) {
  return;
  const filename = 'write-test.js';
  console.log(data.toString('utf8'));
  fs.writeFile(filename, data, err => {
    if (err) throw err;
    console.log("successful write to", filename);
  });
}
const readFileReject = err => console.log(err, ": rejected Promise");
readData.then(readFileFulfill, readFileReject);

const server = http.createServer((req, res) => {
  if (req.url === '/')
    res.end('hello world! (server-side)');
  if (req.url === '/about')
    res.end('my very first js server, hosted from my laptop');
  else
    res.end(`
      <h1>uh oh</h1>
      <p>the requested page doesn't exist (yet)</p>
      <a href="/">back home</a>`
    );
});
server.listen(5000);
