fireaction
========
Easy copy and move actions within a firebase database

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/ghostffcode/fireaction.svg?branch=master)](https://travis-ci.org/ghostffcode/fireaction)

Why?
-------
I simply got tired of rewriting the same copy (and remove) code for every firebase project.

Installation
----------------
```bash
# with npm
npm install --save fireaction

# with yarn
yarn add fireaction
```

For browsers, use the build in `dist/fireaction.js`

Usage
--------
In nodejs:
```js
var Fireaction = require('fireaction')

// ...
// require and setup firebase
//...
// get firebase database ref
const ref = firebase.database().ref()

// configure fireaction with firebase database ref
const fireaction = new Fireaction(ref)

// copy from one path to the other
// async with either callback
fireaction.copy(src, dest, callback)
// or promise
fireaction.copy(src, dest)
	.then(function (sourceData) {/* ... */})
```

Options
-----------
Fireaction `copy` and `move` methods can take in a third object argument instead of a callback:
```js
const options = { withKey: true }

fireaction(src, dest, options, callback)
```
| Option | Type (default) | Description |
| --- | --- | -- |
| withKey | boolean (**true**) | Copies parent key with value into destination path |
| override | boolean (**false**) | Overrides existing data in destination path |

### Running Tests
- `npm run lint`: runs the linter ([standard](http://standardjs.com/))
- `npm run unit`: runs the unit tests
- `npm test`: runs both the linter and the tests

### Creating a build for browser
Build is run by webpack, so install dependencies:
```bash
# with npm
npm install

# with yarn
yarn
```
Then run build:
```bash
npm run build
```
**NB**: It is better to build using `npm start` which will lint and test before building.

### Contributing
To contribute:
- Take a look at existing issues.
- Create fixes/updates.
- Write tests.
- Lint, run tests and build.
- Send detailed PR.

License
-------
Licensed under MIT

Copyright (c) 2017 [ghostffcode](https://github.com/ghostffcode)
