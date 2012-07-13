module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: ['src/core.js', 'src/events.js'],
        dest: 'dist/os.js'
      }
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      // files: '<config:lint.files>',
      // tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    },
    build: {
      essential: ['core', 'events'],
      options: {
        'core': ['src/core.js'],
        'events': ['src/events.js'],
        'slideshow': ['src/slideshow.js', 'src/slideshow-effects.js'],
        'slideshoweffects': ['src/slideshow-effects.js'],
        'gallery': ['src/gallery.js'],
        'videoplayer': ['src/videoplayer.js'],
        'musicplayer': ['src/musicplayer.js']
      },
      dest: 'dist/os.js'
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
