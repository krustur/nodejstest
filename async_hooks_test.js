const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // Imagine any chain of async operations here
    // setImmediate(() => {
    setTimeout(() => {
      logWithId('finish');
      res.end();
    }, 2000);
  });
}).listen(1616);

http.get('http://localhost:1616');
http.get('http://localhost:1616');
http.get('http://localhost:1616');
http.get('http://localhost:1616');
