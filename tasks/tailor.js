/*
 * grunt-tailor
 * https://github.com/felixlaumon/grunt-tailor
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

  /*
    Usage: grunt tailor:+optionA,-optionB,+optionC
  */
  grunt.registerTask('tailor', 'Customize files to be concatenated', function(input) {
    grunt.helper('tailor', input);
  });

  grunt.registerHelper('tailor', function(input, opts) {
    var _ = grunt.utils._;

    // Transform string input +optionA,-optionB,+optionC into an object
    // { ..., optionA: { op: '+', file: [...] } ,...}
    var modulesName = (input && input.length) ? input.split(',') : [];
    var buildOpts = {};
    var shouldFail;
    modulesName.forEach(function(moduleName){
      // Check if the first letter is "+" or "-". Otherwise fail.
      if (moduleName[0] !== '+' && moduleName[0] !== '-') {
        grunt.log.writeln(moduleName + ' lacks an operator ("+" or "-")');
        shouldFail = true;
      }
      var name = moduleName.replace(/[\+]*[\-]*/g, '');
      // Check if the name has been inputted because "exclusivity beats inclusivity"
      // If yes, check if already excluded
      // If already excluded, ignore the inclusivity
      if (buildOpts[name]) {
        if (buildOpts[name].op === '-') {
          return;
        }
      }
      buildOpts[name] = {
        op: moduleName[0],
        file: opts.options[name]
      };
    });
    if (shouldFail) {
      return false;
    }

    opts = opts || grunt.config('tailor');
    var essential = opts.essential;
    var dest = opts.dest ? opts.dest : grunt.config('concat.dist.dest');
    dest = grunt.template.process(dest, grunt.config());
    var options = opts.options;

    // Get a list of file names that should be included
    var filesToBeConcat = [];
    Object.keys(options).forEach(function(key){
      // Expand the list of files
      var file = grunt.file.expandFiles(options[key]);
      // If key is included in the essential list, concat
      if (essential.indexOf(key) !== -1) {
        // Only only results in unique files
        filesToBeConcat = _.union(filesToBeConcat, file);
      // Else if key is included in buildOpts and should be included
      } else if (buildOpts[key] && buildOpts[key].op === '+') {
        // Only only results in unique files
        filesToBeConcat = _.union(filesToBeConcat, file);
      }

      // Take out any files that is explicitly excluded
      if (buildOpts[key] && buildOpts[key].op === '-') {
        filesToBeConcat = _.difference(filesToBeConcat, file);
      }
    });

    // Insert intro, if provided
    if (opts.intro && opts.intro.length) {
      filesToBeConcat = _.union(opts.intro, filesToBeConcat);
    }

    // Insert outro, if provided
    if (opts.outro && opts.outro.length) {
      filesToBeConcat = _.union(filesToBeConcat, opts.outro);
    }

    // Prefix file path if necessary
    if (opts.prefix) {
      filesToBeConcat = filesToBeConcat.map(function(fileName) {
        return opts.prefix + fileName;
      });
    }

    // Only concatenate files if there is something we should concatenate
    if (filesToBeConcat.length) {
      grunt.log.writeln('Concatenating ' + filesToBeConcat.toString().replace(/,/g, ', '));
    } else {
      grunt.log.writeln('No files to be concatenated');
      return false;
    }

    // TODO: defaults separator to grunt's one
    var separator = opts.separator ? opts.separator : '\n';
    var src = grunt.helper('concat', filesToBeConcat, {separator: separator});
    grunt.file.write(dest, src);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + dest + '" created.');
  });

};
