const http = require('http');
const assert = require('assert');
const app = require('../src/app');

const server = http.createServer(app);

server.listen(0, () => {
  const port = server.address().port;
  http.get(`http://localhost:${port}`, (res) => {
    assert.strictEqual(res.statusCode, 200);

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      assert.strictEqual(JSON.parse(data).message, 'Hello World');
      server.close();
    });
  });
});
