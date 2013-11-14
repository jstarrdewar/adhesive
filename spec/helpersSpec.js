var helpers = require('../lib/helpers');

describe("determine source map root and filename from path", function () {

    it("counts three levels deep properly", function () {
        var rf = helpers.determineSourceMapRootAndFilenameFromPath("a/b/c/file.js");
        expect(rf.root).toBe("../../../");
        expect(rf.filename).toBe("file.js");
    });

    it("handles root level files properly", function() {
        var rf = helpers.determineSourceMapRootAndFilenameFromPath("file.js");
        expect(rf.root).toBe("");
        expect(rf.filename).toBe("file.js");
    });

    it("counts one-level deep properly", function() {
        var rf = helpers.determineSourceMapRootAndFilenameFromPath("a/file.js");
        expect(rf.root).toBe("../");
        expect(rf.filename).toBe("file.js");
    });
});

describe("create source paths array", function () {

    it("creates a proper source path array under normal circumstances", function() {
        expect(helpers.createSourcePathsArray("js/", ["a.js", "b.js"])).toEqual(["js/a.js", "js/b.js"]);
    });

    it("creates a proper source path array with no source root specified", function() {
        expect(helpers.createSourcePathsArray(undefined, ["js/a.js", "js/b.js"])).toEqual(["js/a.js", "js/b.js"]);
    });

    it("creates a proper source path array when source root doesn't have a trailing slash", function() {
        expect(helpers.createSourcePathsArray("js", ["a.js", "b.js"])).toEqual(["js/a.js", "js/b.js"]);
    });

    it("creates a proper source path array when sources have a leading slash", function() {
        expect(helpers.createSourcePathsArray("js/", ["/vendor/a.js", "/vendor/b.js"]))
            .toEqual(["js/vendor/a.js", "js/vendor/b.js"]);
    });
});