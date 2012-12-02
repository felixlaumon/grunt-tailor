/*
 * grunt-tailor
 * https://github.com/felixlaumon/grunt-tailor
 *
 * Copyright (c) 2012 Felix Lau
 * Licensed under the MIT license.
 */

/**
 * Transform string input into an object
 *
 * @param {String} input Comma separated list e.g. "+moduleA,-moduleB"
 *
 * @return {Object} Mapping of the comma separated string to the name
 * of the module and an array of files. For example, for the input of
 * "+moduleA,-moduleB", { moduleA: '+', moduleB: '-' } will be returned.
 */
function parseInput (input) {
  var modulesNames = (input && input.length) ? input.split(',') : [];
  var inputObj = {};

  modulesNames.forEach(function (moduleName) {
    var op = moduleName[0];
    var name = moduleName.replace(/[\+]*[\-]*/g, '');

    // Check if the first letter is "+" or "-".
    if (op !== '+' && op !== '-') {
      grunt.warn(moduleName + ' does not have a proper operator ("+" or "-")');
    }

    // Ignore any module that has been excluded. E.g. moduleA will not be
    // included if the input is "+moduleA,+moduleB,-moduleA"
    if (inputObj[name] === '-') {
      return;
    }

    inputObj[name] = op;
  });

  return inputObj;
}

function filesToConcat (input, moduleList) {

}

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

  grunt.registerHelper('tailor', function(inputStr, opts) {
    var _ = grunt.utils._;
    opts = opts || grunt.config('tailor');
    var essential = opts.essential;
    var dest = opts.dest ? opts.dest : grunt.config('concat.dist.dest');
    dest = grunt.template.process(dest, grunt.config());
    var moduleList = opts.options;

    // Parse input to object
    var input = parseInput(inputStr);

    // Get a list of file to be concatednated
    var filesToConcat = [];
    Object.keys(moduleList).forEach(function(key){
      // Look at each module and see if it should be included
      var files = grunt.file.expandFiles(moduleList[key]);

      // If key is included in the essential list, concat
      if (~essential.indexOf(key)) {
        // NOTE: _.union removes duplicating files
        filesToConcat = _.union(filesToConcat, files);

      // Else if key is included in input and should be included
      } else if (input[key] === '+') {
        filesToConcat = _.union(filesToConcat, files);
      }

      // Remove any files that is explicitly excluded
      if (input[key] === '-') {
        filesToConcat = _.difference(filesToConcat, files);
      }
    });

    // Insert intro, if provided
    if (opts.intro && opts.intro.length) {
      filesToConcat = _.union(opts.intro, filesToConcat);
    }

    // Insert outro, if provided
    if (opts.outro && opts.outro.length) {
      filesToConcat = _.union(filesToConcat, opts.outro);
    }

    // Prefix file path if necessary
    if (opts.prefix) {
      filesToConcat = filesToConcat.map(function(fileName) {
        return opts.prefix + fileName;
      });
    }

    // Only concatenate files if there is something we should concatenate
    if (filesToConcat.length) {
      grunt.log.writeln('Concatenating ' + filesToConcat.toString().replace(/,/g, ', '));
    } else {
      grunt.log.writeln('No files to be concatenated');
      return false;
    }

    // TODO: defaults separator to grunt's one
    var separator = opts.separator ? opts.separator : '\n';
    var src = grunt.helper('concat', filesToConcat, {separator: separator});
    grunt.file.write(dest, src);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + dest + '" created.');
  });

};
