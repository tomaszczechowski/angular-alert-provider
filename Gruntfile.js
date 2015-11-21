/* global module, grunt */
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  /**
   * Global configuration
   */
  var globalConfig = {
    /**
     * Copy files to specify folders depending on environment.
     */
    copy: {
      vendorFilesToExamples: {
        files: [{
          expand: true,
          src: [
            'vendor/angular/angular.min.js',
            'vendor/angular-bootstrap/ui-bootstrap.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/angular-bootstrap/ui-bootstrap-csp.css',
            'vendor/jquery/dist/jquery.min.js',
            'vendor/bootstrap/dist/css/bootstrap-theme.min.css',
            'vendor/bootstrap/dist/css/bootstrap.css'
          ],
          dest: 'examples/'
        }]
      },
      srcToExamples: {
        files: [{
          expand: true,
          src: [
            'src/alertProvider.js'
          ],
          dest: 'examples/vendor/angular-alert-provider/'
        }]
      },
      srcToDist: {
        src: 'src/alertProvider.js',
        dest: 'dist/alertProvider.js'
      }
    },

    /**
     * Run localhost server.
     */
    connect: {
      examples: {
        options: {
          port: 3001,
          hostname: 'localhost',
          base: 'examples',
          keepalive: true
        }
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/alertProvider.map',
          compress: {
            drop_console: true
          },
          preserveComments: 'all'
        },
        files: {
          'dist/alertProvider.min.js': ['src/alertProvider.js']
        }
      }
    },

    serve: {
      examples: ['copy:vendorFilesToExamples','copy:srcToExamples', 'connect:examples']
    },

    build: {
      build: ['uglify:dist', 'copy:srcToDist']
    }
  };

  grunt.registerMultiTask('serve', 'Run application of specify environment.', function () {
    grunt.task.run(this.data);
  });

  grunt.registerMultiTask('build', 'Building application', function () {
    grunt.task.run(this.data);
  });

  grunt.initConfig(globalConfig);
};

