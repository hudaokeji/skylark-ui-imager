var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    sourceMaps = require('gulp-sourcemaps'),
    amdOptimize = require('gulp-requirejs'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename"),
    util = require('../utils'),
     fs = require('fs');


var src = [util.src +  "**/*.js"];

var dest = util.dest+"uncompressed/";

var requireConfig = {
    baseUrl: util.src,
    out : util.pkg.name + "-all.js",
    packages : [{
       name : util.pkg.name ,
       location :  util.src
    },{
       name : "skylark-langx" ,
       location :  util.lib_langx+"uncompressed/skylark-langx"
    },{
       name : "skylark-utils" ,
       location :  util.lib_utils+"uncompressed/skylark-utils"
    },{
       name : "skylark-utils-canvas2d" ,
       location :  util.lib_utils_canvas2d+"uncompressed/skylark-utils-canvas2d"

    }],
    paths: {
    },

    include: [
        util.pkg.name + "/main"
    ],
    exclude: [
    ]
};


module.exports = function() {
    return amdOptimize(requireConfig)
            .on("error",gutil.log)
        .pipe(header(fs.readFileSync(util.allinoneHeader, 'utf8')))
        .pipe(footer(fs.readFileSync(util.allinoneFooter, 'utf8')))
        .pipe(header(util.banner, {
            pkg: util.pkg
        })) 
        .pipe(gulp.dest(dest));

};