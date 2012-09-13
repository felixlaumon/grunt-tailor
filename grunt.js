module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
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
      intro: ['src/intro.js'],
      outro: ['src/outro.js'],
      essential: ['core', 'events'],
      options: {
        'core': ['src/<%= pkg.name %>-core.js'],
        'events': ['src/<%= pkg.name %>-events.js'],
        'slideshow': ['src/slideshow.js', 'src/slideshow-effects.js'],
        'slideshoweffects': ['src/slideshow-effects.js'],
        'gallery': ['src/gallery.js'],
        'videoplayer': ['src/videoplayer.js'],
        'musicplayer': ['src/musicplayer.js']
      },
      dest: '<config:concat.dist.dest>'
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Test helper
  grunt.registerTask('customViaHelper', 'Demo of using grunt-custom as helper', function() {
    grunt.helper('custom', '+slideshow', {
      essential: ['core', 'events'],
      options: {
        'core': ['<%= pkg.name %>-core.js'],
        'events': ['<%= pkg.name %>-events.js'],
        'slideshow': ['slideshow.js', 'slideshow-effects.js'],
        'slideshoweffects': ['slideshow-effects.js'],
        'gallery': ['gallery.js'],
        'videoplayer': ['videoplayer.js'],
        'musicplayer': ['musicplayer.js']
      },
      dest: '<config:concat.dist.dest>',
      prefix: 'src/'
    });
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

};
