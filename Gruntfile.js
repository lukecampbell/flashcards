module.exports = function(grunt) {
  grunt.initConfig({
    jst: {
      compile: {
        files: {
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
            'components/bootstrap/dist/js/bootstrap.js'
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
            'components/bootstrap/dist/css/bootstrap.css'
          ]
        }
      }
    },
    watch: {
    }

  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jst', 'concat']);
};
