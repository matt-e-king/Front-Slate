module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };


  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    bump: {
      options: {
        // files: ['package.json', 'data/*'],
        // updateConfigs: ['pkg'],
        // commit: true,
        // commitMessage: 'Release v%VERSION%',
        // commitFiles: ['package.json', 'data/*'],
        // createTag: true,
        // tagName: 'v%VERSION%',
        // tagMessage: 'Version %VERSION%',
        // push: true,
        // pushTo: '<insert your git repo>',
        // gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },

    mainConfig: {
      pageType : 'main'
      , version : '<%= pkg.version %>'
      , Index : grunt.file.readJSON('data/index.json')
    },
    banner: '/*!\n' +
            ' * Front End Development Clean Slate v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' */\n',

    // Task configuration.
    clean: {
      main: ['dist', '*.html']
      , currentBuild: ['current_build/**']
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'grunt/*.js']
      },
      src: {
        src: 'js/*.js'
      },
      test: {
        src: 'js/tests/unit/*.js'
      }
    },

    //mustache_render takes all .mustache pages and .mustache partials and output them
    //as static html files
    mustache_render: {
      
      main: {
        options: {
          directory: 'templates/partials'
        },
        files: [
          {
            data: '<%= mainConfig.Index %>',
            template: 'templates/pages/index.mustache',
            dest: 'index.html'
          }
        ]
      }

    },

    concat: {

      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>',
        stripBanners: false
      },

      main: {
        src: [
          'bower_components/angular/angular.js'
          , 'bower_components/angular-route/angular-route.js'
          , 'bower_components/jquery/jquery.js'
          , 'bower_components/bootstrap/dist/js/bootstrap.js'
          , 'js/application.js'
        ],
        dest: 'dist/js/main.js'
      },

      ie8: {
        src: [
          'js/modernizr.min.js'
          , 'js/respond.min.js'
          , 'js/ie8-application.js'
        ]
        , dest: 'dist/js/ie8.js'
      }

    },


    //javascript uglifying and minifying
    uglify: {
      options: {
        report: 'min'
      },


      main: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.main.dest %>',
        dest: 'dist/js/<%= pkg.name %>-main.min.js'
      }

      , ie8: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.ie8.dest %>',
        dest: 'dist/js/<%= pkg.name %>-ie8.min.js'
      }
    },


    //converting LESS to CSS and minifying
    less: {

      main: {
        options: {
          strictMath: true,
          outputSourceFiles: true,
        },
        files: {  
          'dist/css/main.css': 'less/main.less'
        }
      },


      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/main.min.css': 'dist/css/main.css'
        }
      }
    },


    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/main.min.css',
          ]
        }
      }
    },

    // csscomb: {
    //   options: {
    //     config: 'less/.csscomb.json'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.version %>/css/<%= pkg.name %>-main.css': 'dist/<%= pkg.version %>/css/<%= pkg.name %>-main.css',
    //       'app/dist/css/<%= pkg.name %>-app.css': 'app/dist/css/<%= pkg.name %>-app.css'
    //     }
    //   }
    // },

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'bower_components/font-awesome/', src: 'fonts/*', dest: 'dist/'}
        ]
      }
      // , currentBuild: {
      //   files: [
      //     {expand:true, cwd: '', src: 'dist/**', dest: 'current_build/<%= pkg.version %>/'}
      //     , {expand:true, cwd: '', src: 'images/**', dest: 'current_build/<%= pkg.version %>/'}
      //     , {expand:true, cwd: '', src: '*.html', dest: 'current_build/<%= pkg.version %>/'}
      //     , {expand:true, cwd: '', src: 'templates/**', dest: 'current_build/<%= pkg.version %>/dist/'}
      //   ]
        
      // }
    },

    watch: {
      less: {
        files: ['less/**/*.less'],
        tasks: 'less'
      },
      scripts: {
        files: 'js/*.js',
        tasks: 'concat'
      },
      mustache_render: {
        files: ['data/*.json', 'templates/pages/**/*.mustache', 'templates/partials/**/*.mustache'],
        tasks: ['mustache_render:main']
      }
    },

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('current-build', ['clean:currentBuild', 'copy:currentBuild']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  //Custom Build
  grunt.registerTask('build', ['clean:main', 'less', 'dist-js', 'copy:main', 'mustache_render:main', 'usebanner']);


};
