# Init-Static

_*An optimized package and gruntfile for rapidly spooling up a static Bootstrap website.*_

This is a dead-simple setup for developing static HTML or dynamic PHP websites using Bootstrap, Grunt and Livereload.

## Installation


 ```bash
 # Download or clone the repo. 
 git clone https://github.com/lacymorrow/init-static.git

 # `cd` into the directory and run `npm install` to install Grunt and all of the local dependencies. 
 cd init-static && npm install;
 ```

 
### Run `grunt build` to build and update Bootstrap to the latest version  (you may need to `npm install -g grunt-cli` if you have never used Grunt) and build the initial project with all assets. You only need to run `grunt build` to build project dependencies.



## Building

 * `grunt` will build the website and output all files to the `dist` directory.

`grunt serve` will build the website and open the `dist` folder in the browser using the grunt-express plugin. It will watch and persist your session as you make changes and save source files using Livereload.

### Grunt Tasks

 * Assets have `git pull; npm install; grunt` run to build them and are copied to `dist/assets`.

 * JSHint is run on the gruntfile and `src/js` directory.

 * All JS is concated into `dist/js/init.js` and minified into `dist/js/init.min.js`.

 * LESS is compiled into CSS.

 * CSS is concated, prefixed, combed into `dist/css/init.css` then minified to `dist/css/init.css`.

 * Images in `src/img` are compressed and copied to `dist/img`

 * The `src/app` and `src/html` directories are copied to `dist`.