# grunt-autospritesmith

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-autospritesmith --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-autospritesmith');
```

## The "autospritesmith" task

### Overview
In your project's Gruntfile, add a section named `autospritesmith` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  autospritesmith: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.sprite
Type: `Object`
Default value: `{padding: 5, cssFormat: 'css'}`

An object value that is used as default options for grunt-spritesmith task.
It's as same as grunt-spritesmith config and supports all grunt-spritesmith options except src, dest and destCSS

#### options.destPathMap
Type: `String`
Default value: `''`

A string value that is used to do change path of generated sprite image files relative to base images path.

#### options.destCssPathMap
Type: `String`
Default value: `''`

A string value that is used to do change path of generated style files relative to base images path.

### Usage Examples

### Basic Usage

Project structure:

app
--img
----test-sprite
------icon1.png
------icon2.png
------sprite
--------test-sprite.css
--------test-sprite.png

```js
grunt.initConfig({
  autospritesmith: {
    options: {},
    default_options: {
      options: {},
      files: [
        {
          expand: true,
          cwd: 'app/img',
          src: '**/*-sprite',
          filter: 'isDirectory'
        }
      ]
    },
  },
});
```

#### Advance Options
Using sass and generating sprite files in a custom path.

Project structure:

app
--img
----genrated-images
------test1-sprite.png
------test2-sprite.png
----sprite
------test1-sprites
--------icon1.png
--------icon2.png
------test2-sprites
--------icon1.png
--------icon2.png
--scss
----sprites
------test1-sprite.scss
------test2-sprite.scss

```js
grunt.initConfig({
  autospritesmith: {
    options: {
      sprite:{
        padding: 2,
        cssFormat:'scss'
      },
      destPathMap:'../../generated-images',
      destCssPathMap:'../../../scss/sprites'
    },
    files: [
      {
        expand: true,
        cwd: 'tmp/custom_options',
        src: '**/*-sprite',
        filter: 'isDirectory'
      }
    ]
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
2015-01-28 v0.0.1-beta Initial Release.
