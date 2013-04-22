/*
 * grunt-tailor
 * https://github.com/felixlaumon/grunt-custom
 *
 * Copyright (c) 2013 Felix Lau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    tailor: {
      intro: ['example-src/intro.js'],
      outro: ['example-src/outro.js'],
      essential: ['core', 'events'],
      src: {
        'core': ['example-src/<%= pkg.name %>-core.js'],
        'events': ['example-src/<%= pkg.name %>-events.js'],
        'slideshow': ['example-src/slideshow.js', 'example-src/slideshow-effects.js'],
        'slideshoweffects': ['example-src/slideshow-effects.js'],
        'gallery': ['example-src/gallery.js'],
        'videoplayer': ['example-src/videoplayer.js'],
        'musicplayer': ['example-src/musicplayer.js']
      },
      dest: 'example-outputs/os.js'
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'tailor', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
