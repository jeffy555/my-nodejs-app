const { test } = require('node:test');
const assert = require('node:assert');
const http = require('http');
const app = require('../src/app');

test('GET / returns Hello World', async () => {
  const server = http.createServer(app);
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const body = await new Promise((resolve, reject) => {
    http.get('http://localhost:' + port, res => {
      assert.strictEqual(res.statusCode, 200);
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
      res.on('error', reject);
    }).on('error', reject);
  });
  const parsed = JSON.parse(body);
  assert.strictEqual(parsed.message, 'Hello World');
  server.close();
});
