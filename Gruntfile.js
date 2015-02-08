module.exports = function(grunt) {
  grunt.initConfig({
    jst: {
      compile: {
        files: {
          'static/partials/index.js' : [
            'app/partials/*.html'
          ]
        }
      }
    },
    concat: {
      js: {
        options: {
          banner: "'use strict';\n",
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
        },
        files: {
          'static/js/index.js' : [
            'components/jquery/dist/jquery.js',
            'components/bootstrap/dist/js/bootstrap.js',
            'components/underscore/underscore.js',
            'components/backbone/backbone.js',
            'app/views/*.js',
            'app/models/*.js'
          ]
        }
      },
      css: {
        options: {
          process: function(src, filepath) {
            return src.replace('/*# sourceMappingURL=bootstrap.css.map */','');
          }
        },
        files: {
          'static/css/index.css': [
            'components/bootstrap/dist/css/bootstrap.css',
            'app/css/*.css'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['concat'],
        options: {
        }
      },
      css: {
        files: ['app/**/*.css'],
        tasks: ['concat'],
        options: {
        }
      },
      partials: {
        files: ['app/**/*.html'],
        tasks: ['jst'],
        options: {
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jst', 'concat']);
};
