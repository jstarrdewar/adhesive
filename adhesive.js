#! /usr/bin/env node

/* @author John Starr Dewar */

var UglifyJS = require('uglify-js');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('adhesive.json', 'utf-8'));

var options = { compress: { global_defs: { DEBUG: false } }};
var debugMode = process.argv[2] === "--debug";

var sourceRoot = config.sourceRoot || "";
var sourceMapPath = config.outputPath + ".map";
var sourceMapRoot = "../";

if (debugMode) {
    if (config.sourceMap) {
        sourceMapPath = config.sourceMap.path || null;
        sourceMapRoot = config.sourceMap.root || null;
    }

    options = {
        outSourceMap: sourceMapPath,
		// this is Uglify's sourceRoot parameter, which is not to be confused with ours!
        sourceRoot: sourceMapRoot
    }
}

var sources = [];

for (var i = 0; i < config.sources.length; i++) {
    sources.push(sourceRoot + config.sources[i]);
}

var result = UglifyJS.minify(sources, options);

if (debugMode) {
    result.code += "//@ sourceMappingURL=/" + sourceMapPath;

    fs.writeFile(sourceMapPath, result.map, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The sourcemap was saved as " + sourceMapPath);
        }
    });
}

fs.writeFile(config.outputPath, result.code, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("The build was saved as " + config.outputPath);
    }
});