const path = require('path');
const { readFileSync } = require('fs');
const { Script } = require('vm');
const test = require('ava');
const { JSDOM, VirtualConsole } = require('jsdom');

const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);

const script = new Script(
  readFileSync(path.join(__dirname, '..', 'dist', 'url-regex-unsafe.min.js'))
);

const dom = new JSDOM(``, {
  url: 'http://localhost:3000/',
  referrer: 'http://localhost:3000/',
  contentType: 'text/html',
  includeNodeLocations: true,
  resources: 'usable',
  runScripts: 'dangerously',
  virtualConsole
});

dom.runVMScript(script);

test('should work in the browser', (t) => {
  t.true(typeof dom.window.urlRegexUnsafe === 'function');
  t.true(dom.window.urlRegexUnsafe({ exact: true }).test('github.com'));
  t.deepEqual(
    'some long string with url.com in it'.match(dom.window.urlRegexUnsafe()),
    ['url.com']
  );
});
