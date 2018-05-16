<img src="https://s3.amazonaws.com/jstarrdewar.com.bucket/adhesive.jpg" alt="adhesive" width="800">

`adhesive` is a simple build tool that uses UglifyJS to concatenate your JavaScript and make you a nice source map.

I expect this to be most useful for simple, front-end focused projects, particularly those that are already working with a traditional list of `<script>` tags in `index.html` (and where you may not want to rock the boat).  There are [more sophisticated versions of this](http://yeoman.io/) out there, but `adhesive` has some advantages:
- There is very little configuration, so it won't take you more than a few minutes to get it working. 
- It __outputs source maps__ so you can easily debug the minified version of your code. 
- It's so simple that you can grab the repo and modify it to your heart's content — without spending very long learning how it works.

`adhesive` doesn't bother with css.  I usually have [compass](http://compass-style.org/) watching my scss files and combining them already.

## Installation

You need to install [Node](http://nodejs.org/) if you haven't already.  Then:

`npm install adhesive -g`

Or you can clone this repository, `cd` into into it, and run `npm install`, then `npm link`.  That's a good option if you want to try modifying adhesive.

## Usage

`adhesive <config_path> [--debug | --dont-minify | --help]`

Your config file must have a .json extension.  You may omit the extension when invoking adhesive. For example, if your configuration file is named `build.json`, the following are equivalent:

`adhesive build`<br/>
`adhesive build.json`

### Flags

`--debug`
- Compiles a source map and saves it alongside the built JavaScript (in previous versions you could put the source maps in
a different folder, but it was very confusing to configure so I've removed it).

`--no-uglify`
- Will tell adhesive to only concatenate your code (no uglifying), which is useful if you need to debug something in a browser that doesn't support source maps.

`--help`
- Displays this information in the terminal.

### Automation

#### Nodemon

I recommend using [nodemon](https://github.com/remy/nodemon) with adhesive to recombine your code each time you make a change.  Thanks to source maps, this allows you to have a nice workflow that is pretty much identical to using `<script>` tags:

`npm install nodemon -g`<br/>
`nodemon adhesive build --debug`

__Important:__ note that if you install adhesive from npm or use `npm link`, you'll need to use nodemon's `--exec` mode:

`nodemon --exec adhesive build --debug --watch src-js`

You'll notice that I used the `--watch` option to specify the watch folder.  In this example I'm building to the 'js' folder, but all my constituent files are in 'src-js'.  

The reason is simple: if you use nodemon to execute adhesive and the latter saves its output to the same folder nodemon is watching (such as the project directory), you'll wind up with a crazy infinite loop because nodemon will detect adhesive's output as a change.  

#### IntelliJ Platform File Watchers

<img src="https://s3.amazonaws.com/jstarrdewar.com.bucket/adhesive_IntelliJ_config.png" alt="IntelliJ File Watcher Configuration" width="711">

## Configuration

The configuration file is a JSON document (as noted above, you can name it anything, but I recommend `build.json`).  It requires that you specify an array of source files and an output path, like so:

```json
{
    "sources":[
        "swipe.js",
        "PxLoader.js",
        "PxLoaderImage.js",
        "main.js"
    ],
    "outputPath":"main_built.js"
}
```
It probably goes without saying that the sources are concatenated in the order listed, so if your site currently has a list of script tags, you'll want to maintain that same order in here.

### Optional Parameters

#### sourceRoot
You can set a `sourceRoot` path that will be prepended to the file paths in the `sources` array:

```json
{
    "sourceRoot":"src",
    "sources":[
        "vendor/swipe.js",
        "vendor/PxLoader.js",
        "vendor/PxLoaderImage.js",
        "main.js"
    ],
    "outputPath":"js/main_built.js"
}
```

#### uglifyGlobals
You can define globals that will be injected during the Uglifying process (when the `--debug` option is _not_ used). [Find out why you might want to do this](http://jstarrdewar.com/blog/2013/02/28/use-uglify-to-automatically-strip-debug-messages-from-your-javascript/) on my blog. Use a hash called `uglifyGlobals`:

```json
{
    "sourceRoot":"src",
    "sources":[
        "vendor/swipe.js",
        "vendor/PxLoader.js",
        "vendor/PxLoaderImage.js",
        "main.js"
    ],
    "uglifyGlobals": {
        "DEBUG":false
    },
    "outputPath":"js/main_built.js"
}
```

## Version History

#### 1.0.1
- Fixed security warning from outdated version of UglifyJS

#### 1.0.0
- Added configurable definition of globals for uglify (instead of always being DEBUG:false).
- Moved some code to helpers.js to facilitate unit tests.
- Added Jasmine specs.
- Removed `sourceMap` configuration hash because it was confusing.  Now uses sensible default of saving the source map with the built file.
- Decided to call it 1.0, because I don't think there's much left to add at this point.

#### 0.1.1
- Fixed a bug thanks to Adrian Unger.

#### 0.1.0
- Initial release.

## License
FreeBSD:
```
Copyright (c) 2013, John Starr Dewar
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those
of the authors and should not be interpreted as representing official policies, 
either expressed or implied, of the FreeBSD Project.
```

