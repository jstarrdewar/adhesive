#! /usr/bin/env node

/**
 * adhesive
 * (c) 2013 John Starr Dewar
 * FreeBSD License. See README for details.
 */

var UglifyJS = require('uglify-js');
var fs = require('fs');
var helpers = require('./lib/helpers');

//----- Parse the Arguments -----//

var configPath = process.argv[2];

if (configPath && configPath !== "--help") {
	if (configPath == "--debug" || configPath == "--dont-minify") {
		noConfig();
		return;
	} else {
		if (configPath.substr(-5) !== ".json") configPath += ".json";
		try {
			var config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
		} catch (e) {
		    fileReadError(configPath, e);
			return;
		}
	}
} else {
	help();
	return;
}

var options = config.productionGlobals ? { compress: { global_defs: config.productionGlobals }} : {};
var debugMode = process.argv[3] === "--debug";
var noUglify = process.argv[3] === "--no-uglify";

var sourceMapPath = config.outputPath + ".map";
var rf = helpers.determineSourceMapRootAndFilenameFromPath(sourceMapPath);
var sourceMapFilename = rf.filename;

// If we're in debug mode we won't define any production globals.
if (debugMode) {
    options = {
        outSourceMap: sourceMapPath,
		// this is Uglify's sourceRoot parameter, which is not to be confused with ours!
        sourceRoot: rf.root
    }
}

//----- Create the Build -----//

var sources = helpers.createSourcePathsArray(config.sourceRoot, config.sources);

var result;

if (noUglify) {
	result = {code:""};
	for (var j=0; j < sources.length; j++) {
		var path = sources[j];
		try {
			var file = fs.readFileSync(path, 'utf-8');
		} catch (e) {
		    fileReadError(path, e);
			return;
		}
		if (j > 0) result.code += "\n\n";
		result.code += "/* source: " + path + " */\n\n" + file;
	}
} else {
	result = UglifyJS.minify(sources, options);
}

//----- Output -----//

if (debugMode) {
    result.code += "//# sourceMappingURL=" + sourceMapFilename;

    fs.writeFile(sourceMapPath, result.map, function (err) {
        if (err) {
			fileWriteError(err);
			return;
        } else {
            console.log("The sourcemap was saved as " + sourceMapPath + "");
        }
    });
}

fs.writeFile(config.outputPath, result.code, function (err) {
    if (err) {
		fileWriteError(err);
		return;
    } else {
        console.log("The build was saved as " + config.outputPath + "");
    }
});

//----- Feedback -----//

function noConfig() {
	console.log("[!] I couldn't stick anything together because you didn't specify a configuration.");
}

function fileReadError(path, err) {
	console.log("[!] I couldn't read '" + path + "' because:");
	console.log("\t" + err + "\n");
}

function fileWriteError(err) {
	console.log("Uh oh, make sure the directory exists that I'm trying to save to.");
    console.log(err);
}

function help() {
	console.log("\nUsage:\n\n"+
		"adhesive <config_path> [--debug | --dont-minify | --help]\n\n" +
		"Your config file must have a .json extension.  You may omit the extension when invoking adhesive. For example, the following are equivalent:\n\n"+
		"adhesive build\n"+
		"adhesive build.json\n\n"+
		"Flags:\n\n"+
		"--debug\n"+
		"    1) compiles a source map\n"+
		"    2) defines a constant DEBUG=true which you can use to hide console.log from the production build as described in the UglifyJS 2 documentation.\n\n"+
		"--no-uglify\n"+
		"    adhesive will only concatenate your code (no uglifying), which is useful if you need to debug something in a browser that doesn't support source maps.\n\n"+
		"--help\n"+
		"    You are here.\n"
	);
}