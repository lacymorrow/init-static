module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
          ' * <%= pkg.name%> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
          ' * Copyright 2014-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
          ' * Licensed under <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
          ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap requires jQuery\') }\n\n',
    /* EXECUTE BUILD ASSET GRUNT - 
    Remember: to add new assets install to devDependencies (package.json) and copy list below.
    You are responsible for keeping assets up to date (e.g. git pull) */
    exec: {
      bootstrap: {
        command: '(cd assets/bootstrap;git pull;rm -f Gruntfile.js;npm install;grunt -f)'
      }
    },
    copy: {
    /* BUILD ASSETS TO COPY */
      bootstrap: {
        expand: true,
        cwd: 'assets/bootstrap/dist/',
        src: ['**'],
        dest: 'dist/assets/bootstrap/'
      },
    /* END OF BUILD ASSETS */
      app: {
        expand: true,
        cwd: 'src/',
        src: ['app/**'],
        dest: 'dist/'
      },
      favicon: {
        expand: true,
        cwd: 'src/img/',
        src: 'favicon.ico',
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        cwd: 'src/fonts/',
        src: ['**'],
        dest: 'dist/fonts/'
      },
      html: {
        expand: true,
        cwd: 'src/html/',
        src: ['**'],
        dest: 'dist/'
      }
    },
    autoprefixer: {
        options: {
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9']
        },
        dist: {
          expand: true,
          flatten: true,
          src: 'dist/css/*.css',
          dest: 'dist/css/'
        },
    },
    clean: {
      dist: 'dist/*'
    },
    concat: {
      options: {
        banner: '<%= banner %>\n',
        stripBanners: false
      },
      css: {
        src: ['dist/css/style.css', 'src/css/**/*.css'],
        dest: 'dist/css/style.css'
      },
      js: {
        options: {
          banner: '<%= banner %>\n<%= jqueryCheck %>\n'
        },
        src: ['src/js/**/*.js'],
        dest: 'dist/js/main.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist/',
          middleware: function(connect, options) {
          
            return [
              require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
              connect.static(options.base)
            ];
          }
        }
      }
    },
    csscomb: {
      dist: {
        files: {
          'dist/css/style.css': 'dist/css/style.css'
        }
      }
    },
    cssflip: {
      rtl: {
        files: {
          'dist/css/style-rtl.css': 'dist/css/style.css'
        }
      }
    },
    csslint: {
      src: [
        '<%= cssmin.dist.dest %>'
      ]
    },
    cssmin: {
      dist: {
        options: {
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          selectorsMergeMode: 'ie8',
          keepSpecialComments: 0
        },
        src: [
          'dist/css/*.css',
          '!*.min.css'
        ],
        dest: 'dist/css/style.min.css'
      }
    },
    express: {
       dist: {
         options: {
           port: 8000,
           hostname: "0.0.0.0",
           bases: ['dist/'],
           livereload: true
         }
       }
     },
    imagemin: {
        dist: {
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/img/'
            }]
        }
    },
    jscs: {
      grunt: {
        src: 'Gruntfile.js'
      },
      src: {
        src: 'src/js/*.js'
      },
    },
    jshint: {
      dist: ['Gruntfile.js', 'src/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
      dist: {
        options: {
          cleancss: true,
        },
        files: {
          "dist/css/style.css": "src/less/*.less"
        }
      }
    },
    open: {
      dist: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.dist.options.port%>'
      }
    },
    php: {
        server: {
            options: {
                port: 8000,
                base: 'dist/',
                keepalive: true,
                open: true
            }
        }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/main.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    watch: {
      files: ['<%= jshint.dist %>','src/**/*'],
      tasks: ['dist']
    }
  });

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('assets', ['exec', 'copy']);
  grunt.registerTask('js', ['concat:js', 'uglify']);
  grunt.registerTask('css', ['less', 'concat:css', 'autoprefixer', 'csscomb', 'cssflip', 'cssmin']);
  grunt.registerTask('static', ['copy', 'imagemin']);
  grunt.registerTask('dist', ['clean', 'js', 'css', 'static']);
  grunt.registerTask('serve', ['dist','express', 'open', 'watch']);
  grunt.registerTask('build', ['assets','test','dist']);
  grunt.registerTask('default', ['dist']);
};
