module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      dest: 'dist/test.js'
    },
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
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
      essential: ['a', 'b'],
      files: {
        'a': ['src/a.js'],
        'aa': ['src/aa.js'],
        'b': ['src/b.js'],
        'c': ['src/c.js'],
        'd': ['src/d.js']
      }
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
