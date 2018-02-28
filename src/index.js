const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const lib = require('./lib')

if (argv._.length === 0) {
  // interactive mode
  require('./interactive')
} else if (lib.isFile(argv._[0])) {
  // execute file
  require('./exec-file.js')(argv._[0])
} else {
  // execute one command
  console.log('one')
}
