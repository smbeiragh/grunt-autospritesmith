'use strict';

var grunt = require('grunt');
var ndd = require('node-dir-diff');
var path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.autospritesmith = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var dd = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/default_options/app'),
        path.resolve('tmp/default_options/app')
      ],
      'list'
    );

    dd.compare(function (err, result) {
      test.ok(result.deviation === 0, 'default_options: css and sprite files created in sprite directory.');
      test.done();
    });

  },
  custom_options: function(test) {
    test.expect(1);

    var dd = new ndd.Dir_Diff(
      [
        path.resolve('test/expected/custom_options/app'),
        path.resolve('tmp/custom_options/app')
      ],
      'list'
    );

    dd.compare(function (err, result) {
      test.ok(result.deviation === 0, 'custom_options: scss and sprite files created in scss and generated-images directories.');
      test.done();
    });
  },
};
