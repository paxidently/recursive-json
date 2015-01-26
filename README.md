# recursive-json
Recursive read JSON files in directory.

## Install

````bash
npm install recursive-json
````

## Examples

````js
var rj = require('recursive-json');

// Load single file:
rj.sync('package.json');

// If `package` directory or file doesn't exists, will be tried `package.json`:
rj.sync('package');

// Load directory:
rj.sync('src/data');

// Enable hidden files:
rj.sync('src/data', { hidden: true });
// or
rj.sync('src/data', { '.': true });

// Enable files with names started with underscore:
rj.sync('src/data', { underscore: true });
// or
rj.sync('src/data', { _: true });

````

## TODO

 *  Write async version.
 *  Add tests.
 *  Add API description.
 *  Add JSDoc comments.
