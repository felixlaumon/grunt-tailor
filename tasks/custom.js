/*
 * grunt-custom
 * https://github.com/felixlaumon/grunt-custom
 *
 * Copyright (c) 2012 Felix Lau
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('custom', 'Your task description goes here.', function() {
    /*
      Usage: grunt custom:+fileA-fileB+fileC
    */
    var _ = require('underscore');
    var args = [].slice.call(arguments);
    var modulesName = args.length ? args[0].split(',') : [];
    var opts = {};
    modulesName.forEach(function(moduleName){
      var name = moduleName.replace(/[\+]*[\-]*/g, '');
      opts[name] = {
        op: moduleName[0],
        file: grunt.config('build.files')[name]
      };
    });
    console.log(opts);

    var essential = grunt.config('build.essential');
    var dest = grunt.config('build.dest') ? grunt.config('build.dest') : grunt.config('concat.dest');
    var files = grunt.config('build.files');

    // Get a list of file names that should be included
    var filesToBeConcat = [];
    Object.keys(files).forEach(function(key){
      var file = files[key];
      console.log('file', file);
      console.log(essential.indexOf(key));
      // If key is included in the essential list, concat
      if (essential.indexOf(key) !== -1) {
        filesToBeConcat = _.union(filesToBeConcat, file);
        console.log('essential');
        console.log(filesToBeConcat);
      // Else if key is included in opts and should be included
      } else if (opts[key] && opts[key].op === '+') {
        filesToBeConcat = _.union(filesToBeConcat, file);
        console.log('include');
        console.log(filesToBeConcat);
      }

      // Take out any files that is explicitly excluded
      if (opts[key] && opts[key].op === '-') {
        filesToBeConcat = _.difference(filesToBeConcat, file);
        console.log('exclude');
        console.log(filesToBeConcat);
      }
    });

    console.log(filesToBeConcat);

    // Only concatenate files if there is something we should concatenate
    if (filesToBeConcat.length) {
      grunt.log.writeln('Concatenating ' + filesToBeConcat.toString().replace(/,/g, ', '));
    } else {
      grunt.log.writeln('No files to be concatenated');
      return false;
    }

    // TODO: defaults separator to grunt's one
    var separator = grunt.config('build.separator') ? grunt.config('build.separator') : '\n';
    var src = grunt.helper('concat', filesToBeConcat, {separator: separator});
    grunt.file.write(dest, src);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + dest + '" created.');
  });

};
