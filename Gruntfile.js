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
          'static/js/base.js' : [
            'components/jquery/dist/jquery.js',
            'components/bootstrap/dist/js/bootstrap.js'
          ],
          'static/js/index.js' : [
            'components/jquery/dist/jquery.js',
            'components/bootstrap/dist/js/bootstrap.js',
            'components/underscore/underscore.js',
            'components/backbone/backbone.js',
            'components/backbone.stickit/backbone.stickit.js',
            'app/js/*.js',
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
          'static/css/base.css': [
            'components/bootstrap/dist/css/bootstrap.css',
            'components/font-awesome/css/font-awesome.css'
          ],
          'static/css/index.css': [
            'components/bootstrap/dist/css/bootstrap.css',
            'components/font-awesome/css/font-awesome.css',
            'app/css/base.css'
          ],
          'static/css/entry_view.css': [
            'components/bootstrap/dist/css/bootstrap.css',
            'components/font-awesome/css/font-awesome.css',
            'app/css/base.css',
            'app/css/entry_view.css',
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
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['components/font-awesome/fonts/*'], dest: 'static/fonts/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['components/bootstrap/fonts/*'], dest: 'static/fonts/', filter: 'isFile'}
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jst', 'concat', 'copy']);
  grunt.loadNpmTasks('grunt-contrib-copy');
};
