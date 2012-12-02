# grunt-tailor

Customize files to be concatenated, jQuery 1.8-style.

When building a modulaized framework, you will need to provide a way for your end users to customize which modules to be included in their build. This tools give your users a easy way to customize the final build. For example: `grunt tailor:+slideshow,+gallery,-event`

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-tailor`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-tailor');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Setting up the grunt.js

Add the following to your grunt.js file.

````javascript
grunt.initConfig({
  ...
  build: {
    intro; ['intro.js'],
    outro: ['outro.js'],
    essential: ['core', 'events'],
    options: {
      'core': ['core.js'],
      'events': ['events.js'],
      'slideshow': ['slideshow.js', 'slideshow-effects.js'],
      'slideshoweffects': ['slideshow-effects.js'],
      'gallery': ['gallery.js'],
      'videoplayer': ['videoplayer.js'],
      'musicplayer': ['musicplayer.js']
    },
    dest: 'dist/os.js',
    prefix: 'src/'
  }
  ...
});
````

## Usage

````
// By default the essential ones are concatenated, along with the intro and outro
> grunt tailor
==> 'src/intro.js', 'src/core.js', 'src/events.js', 'src/outro.js'

// Add files with "+". Separate files with ","
> grunt tailor:+slideshow,+musicplayer
==> 'src/intro.js', 'src/core.js', 'src/events.js', 'src/slideshow.js', 'src/slideshow-effects.js', 'src/outro.js'

// Remove files with "-". "-" can remove files listed in essential
> grunt tailor:-events
==> 'src/intro.js', 'src/core.js', 'src/outro.js'

// What if you want `slideshow.js` but not `slideshow-effect.js`?
// You can remove a particular module, which another option has included. Exlucivity beats inclusvity...
> grunt tailor:+slideshow,-slideshoweffects
==> 'src/intro.js', 'src/core.js', 'src/events.js', 'src/slideshow.js', 'src/outro.js'

// ... and order doesn't matter
> grunt tailor:-slideshoweffects,+slideshow
==> 'src/intro.js', 'src/core.js', 'src/events.js', 'src/slideshow.js', 'src/outro.js'

// Intro and outro are *always* included

````

You can try it out but cloning this repo, run `npm install` and run the above commands (like `grunt custom:-core`).

You can also run the task with helper, like this:

````javascript
grunt.helper('tailor', CUSTOM_FILES, OPTIONS);
// CUSTOM_FILES is what you will type after `grunt tailor:`
// OPTIONS is the `build` you set in grunt.js. If you don't provide this, it
// defaults to grunt.js's one.

// For example:
grunt.helper('tailor', '+slideshow', {
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
````

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## TODO

- Add unit tests
- Add support depedency management
- Add support for grunt's multitask?
- Add support for option name to be listed in another option
````javascript
{
  options: {
  ...
  'multimedia': ['videoplayer', 'musicplayer'],
  ...
  }
}
````
- Add shorthand for single file (no need for array)
````javascript
{
  options: {
  ...
  'videoplayer': 'src/events.js',
  ...
  }
}
````

## License
Copyright (c) 2012 Felix Lau <felix@onswipe.com>
Licensed under the MIT license.
