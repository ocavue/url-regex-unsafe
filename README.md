# url-regex-unsafe

[![build status](https://img.shields.io/travis/com/ocavue/url-regex-unsafe.svg)](https://travis-ci.com/ocavue/url-regex-unsafe)
[![code coverage](https://img.shields.io/codecov/c/github/ocavue/url-regex-unsafe.svg)](https://codecov.io/gh/ocavue/url-regex-unsafe)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/ocavue/url-regex-unsafe.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/url-regex-unsafe.svg)](https://npm.im/url-regex-unsafe)

> Regular expression matching for URL's. Maintained, and browser-friendly version of url-regex. This package is vulnerable to [CVE-2020-7661](cve). Works in Node v10.12.0+ and browsers.


## Table of Contents

* [Foreword](#foreword)
* [Install](#install)
* [Usage](#usage)
  * [Node](#node)
  * [Browser](#browser)
* [Options](#options)
* [Quick tips and migration from url-regex](#quick-tips-and-migration-from-url-regex)
* [Contributors](#contributors)
* [License](#license)


## Foreword

url-regex-unsafe is a fork of [url-regex-safe][], which is a fork of [url-regex][]. [url-regex-safe][] has resolved [CVE-2020-7661][cve] on Node by including [RE2][] for Node.js usage. However, [RE2][] does not support lookahead assertions in regular expressions, which leads to some [limitations][url-regex-safe-limitations]. To avoid these limitations, url-regex-unsafe gets rid of [RE2][] and uses built-in RegExp instead. This means that url-regex-unsafe is still vulnerable to [CVE-2020-7661][cve].


## Install

[npm][]:

```sh
npm install url-regex-unsafe
```

[yarn][]:

```sh
yarn add url-regex-unsafe
```


## Usage

### Node

```js
const urlRegexUnsafe = require('url-regex-unsafe');

const str = 'some long string with url.com in it';
const matches = str.match(urlRegexUnsafe());

for (const match of matches) {
  console.log('match', match);
}

console.log(urlRegexUnsafe({ exact: true }).test('github.com'));
```

### Browser

#### VanillaJS

This is the solution for you if you're just using `<script>` tags everywhere!

```html
<script src="https://unpkg.com/url-regex-unsafe"></script>
<script type="text/javascript">
  (function () {
    var str = 'some long string with url.com in it';
    var matches = str.match(urlRegexUnsafe());

    for (var i = 0; i < matches.length; i++) {
      console.log('match', matches[i]);
    }

    console.log(urlRegexUnsafe({ exact: true }).test('github.com'));
  })();
</script>
```

#### Bundler

Assuming you are using [browserify][], [webpack][], [rollup][], or another bundler, you can simply follow [Node](#node) usage above.

#### TypeScript

This package has built-in support for [TypeScript](https://www.typescriptlang.org/).


## Options

| Property         | Type    | Default Value                                                | Description                                                                                                                                                                                                                                                                                                                                                    |   |
| ---------------- | ------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| `exact`          | Boolean | `false`                                                      | Only match an exact String. Useful with `regex.test(str)` to check if a String is a URL. We set this to `false` by default in order to match String values such as `github.com` (as opposed to requiring a protocol or `www` subdomain). We feel this closely more resembles real-world intended usage of this package.                                        |   |
| `strict`         | Boolean | `false`                                                      | Force URL's to start with a valid protocol or `www` if set to `true`. If `true`, then it will allow any TLD as long as it is a minimum of 2 valid characters. If it is `false`, then it will match the TLD against the list of valid TLD's using [tlds](https://github.com/stephenmathieson/node-tlds#readme).                                                 |   |
| `auth`           | Boolean | `false`                                                      | Match against Basic Authentication headers. We set this to `false` by default since [it was deprecated in Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=82250#c7), and otherwise it leaves the user with unwanted URL matches (more closely resembles real-world intended usage of this package by having it set to `false` by default too). |   |
| `localhost`      | Boolean | `true`                                                       | Allows localhost in the URL hostname portion. See the [test/test.js](test/test.js) for more insight into the localhost test and how it will return a value which may be unwanted. A pull request would be considered to resolve the "pic.jp" vs. "pic.jpg" issue.                                                                                              |   |
| `parens`         | Boolean | `false`                                                      | Match against Markdown-style trailing parenthesis. We set this to `false` because it should be up to the user to parse for Markdown URL's.                                                                                                                                                                                                                     |   |
| `apostrophes`    | Boolean | `false`                                                      | Match against apostrophes. We set this to `false` because we don't want the String `background: url('http://example.com/pic.jpg');` to result in `http://example.com/pic.jpg'`. See this [issue](https://github.com/kevva/url-regex/pull/55) for more information.                                                                                             |   |
| `trailingPeriod` | Boolean | `false`                                                      | Match against trailing periods. We set this to `false` by default since real-world behavior would want `example.com` versus `example.com.` as the match (this is different than [url-regex][] where it matches the trailing period in that package).                                                                                                           |   |
| `ipv4`           | Boolean | `true`                                                       | Match against IPv4 URL's.                                                                                                                                                                                                                                                                                                                                      |   |
| `ipv6`           | Boolean | `true`                                                       | Match against IPv6 URL's.                                                                                                                                                                                                                                                                                                                                      |   |
| `tlds`           | Array   | [tlds](https://github.com/stephenmathieson/node-tlds#readme) | Match against a specific list of tlds, or the default list provided by [tlds](https://github.com/stephenmathieson/node-tlds#readme).                                                                                                                                                                                                                           |   |
| `returnString`   | Boolean | `false`                                                      | Return the RegExp as a String instead of a `RegExp` (useful for custom logic, such as we did with [Spam Scanner][spam-scanner]).                                                                                                                                                                                                                               |   |


## Quick tips and migration from url-regex

You must override the default and set `strict: true` if you do not wish to match `github.com` by itself (though `www.github.com` will work if `strict: false`).

Unlike the deprecated and unmaintained package [url-regex][], we do a few things differently:

* We set `strict` to `false` by default ([url-regex][] had this set to `true`)
* We added an `auth` option, which is set to `false` by default ([url-regex][] matches against Basic Authentication; had this set to `true` - however this is a deprecated behavior in Chromium).
* We added `parens` and `ipv6` options, which are set to `false` and `true` by default ([url-regex][] had `parens` set to `true` and `ipv6` was non-existent or set to `false` rather).
* We added an `apostrophe` option, which is set to `false` by default ([url-regex][] had this set to `true`).
* We added a `trailingPeriod` option, which is set to `false` by default (which means matches won't contain trailing periods, whereas [url-regex][] had this set to `true`).


## Contributors

| Name                 | Website                      |
| -------------------- | ---------------------------- |
| **ocavue**           | <https://github.com/ocavue/> |
| **Nick Baugh**       | <http://niftylettuce.com/>   |
| **Kevin Mårtensson** |                              |
| **Diego Perini**     |                              |


## License

[MIT](LICENSE) © ocavue


##

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[cve]: https://nvd.nist.gov/vuln/detail/CVE-2020-7661

[re2]: https://github.com/uhop/node-re2

[browserify]: https://github.com/browserify/browserify

[webpack]: https://github.com/webpack/webpack

[rollup]: https://github.com/rollup/rollup

[url-regex]: https://github.com/kevva/url-regex

[url-regex-safe]: https://github.com/spamscanner/url-regex-safe

[url-regex-safe-limitations]: https://github.com/spamscanner/url-regex-safe/tree/v3.0.0#limitations

[spam-scanner]: https://spamscanner.net
