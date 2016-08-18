# grunt-autospritesmith

> Automatic sprite generator based on grunt-spritesmith.

## Why I should use this plugin
In middle scale and large scale project, editing and configuring every sprite manually and editing, editing, editing Gruntfile is not  a convenient task, even on a small team you can't expect you co-worker to re-config Gruntfile just to add a sprite to project, so every time you should waste your time to do it for him/her. using this plugin you can set a few conventions and people will be able to put some images in some path and include some style some where else and that is all they need. also nobody likes a lot of code and config and re-config just for sprite-ing!

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-autospritesmith grunt-spritesmith --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-autospritesmith');
```

Loading spritesmith task required explicitly

```js
grunt.loadNpmTasks('grunt-spritesmith');
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

**AutoSpriteSmith** is highly configurable and *doesn't enforce any directory structure* on the project. Defining any structure is possible via selecting a group of directories as a group of sprites, each directory contains a set of images and those images will turn in to sprite using the directory name as sprite name.

By default the sprite image and corresponding style file are located in a sprite directory inside the the original directory of images. it is possible to change this via using
**options.destPathMap** and **options.destPathMap**, see advance options on examples section.

### Configuring spritesmith
configuring spritesmith is possible via two methods:

1. globally and via *options.sprite*

All config options of spritesmith are applicable, except those that are configured dynamically by *autospritesmith*. including **src**, **dest** and **destCss**. all other options are available

2. Per target configuration using **spritesmith targets**

**AutoSpriteSmith** generates task targets per sprite dynamically on **spritesmith** task, by default it uses the global config on **options.sprite** as default config, overriding this behavior is possible via defining pre-configured targets on spritesmith task using the **target naming conventions** of AutoSpriteSmith

### Target Naming conventions
AutoSpriteSmith configs task targets on spritesmith dynamically, these target names has three main parts, the **autosprite** keyword, the **autospriteTargetName** which defines the current target on spritesmith is a sub target of **autospriteTargetName** on autospritesmith. The third part **spriteImagesDirectory** is a path to the directory of source images of a specific sprite which uses dot instead of slashes (the system file path separator)

> autosprite-autospriteTargetName-spriteImagesDirectory

You can override a specific sprite config on spritesmith configs using this convention.
e.g. we have a target on AutoSpriteSmith called test. that is going to generate sprites for app/img/my-sprite directory or may be some other sprites the name of the dynamically generated target on spritesmith would be
**autosprite-test-app.img.my-sprtie** so we can config this target on Gruntfile and override some of default configs for this specific sprite.


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

#### options.imageFormat
Type: `String`
Default value: `'png'`

A string value that is used for getting images in specified format and generate sprite in it.

### Usage Examples

### Basic Usage

Project sample structure:

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
