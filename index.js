var   fs     = require('fs')
    , path   = require('path')
    , glob   = require('glob')
    , mkobjp = require('mkobjp')
;

var   jsonExt = /\.json$/
    , relRoot = /^\.?\//;

var load = function (files) {
    var obj = {};
    
    files.forEach(function (path) {
        var json = fs.readFileSync(path);
        path = path.replace(relRoot, '').replace(jsonExt, '').split('/');
        mkobjp(obj, path);
        
        for (var i = 0, t = obj; i < path.length; i++) {
            t = t[path[i]];
        }
        
        json = JSON.parse(json);
        
        for (var key in json) {
            t[key] = json[key];
        }
    });
    
    return obj;
};

var sync = function (pattern) {
    var files = glob.sync(pattern);
    return load(files);
};

module.exports = function (pattern, callback) {
    glob(pattern, function (err, files) {
        callback(err, load(files));
    });
};

module.exports.sync = sync;
