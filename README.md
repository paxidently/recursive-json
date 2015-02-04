# recursive-json
Recursive read JSON files in directory.

## Install

````bash
npm install recursive-json
````

## Examples

````js
var rj = require('recursive-json');

var json = rj.sync('**/**/*.json');

rj('**/**/*.json', function (err, json) {
    console.log(json);
});

````

## TODO

 *  Write truly async version.
 *  Add tests.
 *  Add API description.
 *  Add JSDoc comments.
