#! /usr/bin/env node

/* @author John Starr Dewar */

var UglifyJS = require('uglify-js');
var fs = require('fs');

var configPath = process.argv[2];

if (configPath && configPath !== "--help") {
	if (configPath == "--debug" || configPath == "--dont-minify") {
		printMissingConfigError();
		return;
	} else {
		if (configPath.substr(-5) !== ".json") configPath += ".json";
		try {
			var config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
		} catch (e) {
			console.log("\nI couldn't read the config file because:\n")
			console.log("\t" + e + "\n");
			return;
		}
	}
} else {
	printHelp();
	return;
}

var options = { compress: { global_defs: { DEBUG: false } }};
var debugMode = process.argv[3] === "--debug";
var noUglify = process.argv[3] === "--no-uglify";

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

function printMissingConfigError() {
	console.log("\n[!] I couldn't stick because you didn't specify a configuration.\n");
}

function printHelp() {
	console.log("\nUsage:\n\n"+
		"adhesive <config_path> [--debug | --dont-minify | --help]\n\n" +
		"Your config file must have a .json extension.  You may omit the extension when invoking adhesive. For example, the following are equivalent:\n\n"+
		"adhesive build\n"+
		"adhesive build.json\n\n"+
		"Flags:\n\n"+
		"--debug\n"+
		"    1) compiles a source map\n"+
		"    2) defines a constant DEBUG=true which you can use to hide console.log from the production build as described in the UglifyJS 2 documentation.\n\n"+
		"--dont-minify\n"+
		"    adhesive will only concatenate your code (no uglifying), which is useful if you need to debug something in a browser that doesn't support source maps.\n\n"+
		"--help\n"+
		"    You are here.\n"
	);
}