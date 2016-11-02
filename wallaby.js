module.exports = function (wallaby) {

  return {
    testFramework: 'mocha',

    env: {
      type: 'node',
      runner: 'node'
    },

    files: [
      'index.js',
      'test/fixtures/**/*'
    ],

    tests: [
      'test/**/*.spec.js'
    ]

  };

};