/*
 * grunt-autospritesmith
 * https://github.com/sajjad/autospritesmith
 *
 * Copyright (c) 2015 smbeiragh
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var _ = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var defaultSpriteSmithConf = {
    padding: 5,
    cssFormat: 'css'
  };

  var pathToTargetRegex = {
    '\\': /\\/g,
    '/': /\//g
  };
  function dirToTarget(dir){
    return dir.replace(pathToTargetRegex[path.sep], '.');
  }

  function configSpriteSmith(dir, targetBase, options){

    var conf = grunt.config('sprite') || {};
    var targetName = 'autosprite-' + targetBase + '-' + dirToTarget(dir);
    var spriteName = dir.split(path.sep).pop();
    var target = conf[targetName] = (conf[targetName] || {});

    target = _.merge(options.sprite, target);

    target.src = path.join( dir, '*.png');
    target.dest = path.join( dir, options.destPathMap || 'sprite', spriteName + '.png');
    target.destCss = path.join( dir, options.destCssPathMap || 'sprite', spriteName + '.' + target.cssFormat );

    conf[targetName] = target;
    grunt.config('sprite', conf);

    return targetName;
  }

  grunt.registerMultiTask('autospritesmith', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      sprite:defaultSpriteSmithConf
    });

    var target = this.target;

    // Iterate over all specified file groups.
    grunt.task.run(
      this.filesSrc.filter(function(f) {
        // Concat specified files.
        //var src = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(f)) {
            grunt.log.warn('Source file "' + f + '" not found.');
            return false;
          } else {
            return true;
          }
        }).map(function (f) {
            return 'sprite:' + configSpriteSmith(f, target, options);
        })

      //})
    );
  });

};
