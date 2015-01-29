/*
 * grunt-autospritesmith
 * https://github.com/sajjad/autospritesmith
 *
 * Copyright (c) 2015 smbeiragh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
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
      tests: ['tmp']
    },

    copy: {
      tests: {
        files: [
          {
            expand: true,
            cwd: 'test',
            src: 'app/**/*.*',
            dest: 'tmp/default_options'
          },
          {
            expand: true,
            cwd: 'test',
            src: 'app/**/*.*',
            dest: 'tmp/custom_options'
          }
        ]
      }
    },

    // Configuration to be run (and then tested).
    autospritesmith: {
      default_options: {
        options: {},
        files: [
          {
            expand: true,
            cwd: 'tmp/default_options',
            src: '**/*-sprite',
            filter: 'isDirectory'
          }
        ]
      },
      custom_options: {
        options: {
          sprite:{
            padding: 50,
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
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-spritesmith');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'autospritesmith', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
