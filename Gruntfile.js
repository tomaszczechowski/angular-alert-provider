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
      vendorFiles: {
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
      alertProvider: {
        files: [{
          expand: true,
          src: [
            'src/alertProvider.js'
          ],
          dest: 'examples/vendor/angular-alert-provider/'
        }]
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

    serve: {
      examples: ['copy','connect:examples']
    }
  };

  grunt.registerMultiTask('serve', 'Run application of specify environment.', function () {
    grunt.task.run(this.data);
  });

  grunt.initConfig(globalConfig);
};

