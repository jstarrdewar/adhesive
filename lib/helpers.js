/**
 * adhesive helpers
 *
 * These functions were extracted to make writing specs easier.
 *
 * (c) 2013 John Starr Dewar
 * FreeBSD License. See README for details.
 */

/**
 * Extracts filename from path and root returns number of backward filesystem steps needed to get to the common
 * ancestor that is shared with the source files and the built file.  (../../../...etc.)
 * @param sourceMapPath
 * @returns {{root: string, filename: string}}
 */
module.exports.determineSourceMapRootAndFilenameFromPath = function (sourceMapPath) {
    var segments = sourceMapPath.split('/');
    var depth = segments.length - 1;
    var sourceMapFilename = segments[depth];
    var root = "";
    for (var k = 0; k < depth; k++) {
        root += "../";
    }
    return {root: root, filename: sourceMapFilename};
};

/**
 * Returns an array of paths to the sources.  Allows users to postfix the sourceroot with "/" (or not) or prefix the
 * sources with "/" (or not) by normalizing this input.  It was a confusing point for users since it was easy to forget
 * the proper way to go about it (trailing slash after sourceRoot only).
 * @param sourceRoot
 * @param sources
 * @returns {Array}
 */
module.exports.createSourcePathsArray = function (sourceRoot, sources) {
    var sr = sourceRoot || "";
    if (sr !== "" && sr.slice(-1) !== "/") sr += "/";

    var array = [];

    for (var i = 0; i < sources.length; i++) {
        var source = sources[i];
        if (source.charAt(0) === "/") source = source.slice(1);
        array.push(sr + source);
    }
    return array;
};