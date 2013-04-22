# grunt-tailor

> Allows end users to easily create custom builds of your library

When building a modulaized library, you will need to provide a way for your end users to customize what modules to be included in their custom build. This tools give your users a easy way to customize the final build. For example: `grunt tailor:+slideshow,+gallery,-event`

This task is inspired by jQuery's custom build task.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tailor --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tailor');
```

## Setting up the grunt.js

Add the following to your grunt.js file.

````js
grunt.initConfig({
  ...
  tailor: {
    intro; ['intro.js'],
    outro: ['outro.js'],
    essential: ['core', 'events'],
    src: {
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

You can try it out but cloning this repo, run `npm install` and run the above commands (like `grunt tailor:+gallery`).

## Todo

- Add unit tests
- Add support depedency management
- Add support for option name to be listed in another option
````js
{
  src: {
  ...
  'multimedia': ['videoplayer', 'musicplayer'],
  ...
  }
}
````
- Add shorthand for single file (no need for array)
````js
{
  src: {
  ...
  'videoplayer': 'src/events.js',
  ...
  }
}
````

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
