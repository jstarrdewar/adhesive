![adhesive](https://s3.amazonaws.com/jstarrdewar.com.bucket/adhesive.jpg)

`adhesive` is a simple build tool that uses UglifyJS to concatenate your JavaScript and make you a nice source map.

I expect this to be most useful for simple, front-end focused projects, particularly those that are already working with a traditional list of `<script>` tags in `index.html`.  There are many more sophisticated versions of this out there.  HTML5 Boilerplate's build tool comes to mind.  
		
However, adhesive has some advantages: there is very little configuration, so it won't take you more than a few minutes to get it working; it outputs source maps so you can easily debug the minified version of your code (in case it causes side effects); and it's so simple you can grab `adhesive.js` from the repo on github and modify it to your heart's content without spending very long learning how it works.

##Usage


##License
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
