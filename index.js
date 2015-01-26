var   fs   = require('fs')
    , path = require('path')
;

var jsonFileName = /^(.*)\.json$/;

var recursive = function (dir, options) {
    options = options || {};
    
    var obj = {};
    
    dir = path.resolve(dir);
    
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        // Load subdirs
        
        var list = fs.readdirSync(dir);
        
        // Sort list and optionally filter hidden files and files with names started with underscore
        list = list.sort().filter(function (x) {
            if ((!(options.hidden     || options['.'])) && (x[0] == '.')) return false;
            if ((!(options.underscore || options._   )) && (x[0] == '_')) return false;
            return true;
        });
        
        // Get list of directories
        var dirs = list.filter(function (x) {
            return fs.statSync(path.resolve(dir, x)).isDirectory();
        });
        
        // Get list of files
        var files = list.filter(function (x) {
            return fs.statSync(path.resolve(dir, x)).isFile();
        });
        
        // Load subdirectories
        dirs.forEach(function (x) {
            obj[x] = recursive(path.resolve(dir, x), options);
        });
        
        // Load files
        files.forEach(function (x) {
            if (jsonFileName.exec(x)) {
                obj[jsonFileName.exec(x)[1]] = recursive(path.resolve(dir, x), options);
            }
        });
    }
    else {
        // Load file
        // If it doesn't exists, add .json extension
        dir = fs.existsSync(dir) ? dir : dir + '.json';
        
        if (fs.existsSync(dir) && jsonFileName.exec(path.basename(dir))) {
            try {
                obj = JSON.parse(fs.readFileSync(dir));
            } catch (e) { }
        }
    }
    
    return obj;
};

module.exports = {
    sync: recursive
};

// var rj = require('./'); rj.sync('.');
