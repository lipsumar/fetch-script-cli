const prompt = require('cli-prompt')
const chalk = require('chalk')
const FetchScript = require('fetch-script')
const fetchScript = new FetchScript()

fetchScript.on('out', out => {
  console.log('>', out.data)
})

fetchScript.on('set-var', e => {
  console.log(`  ${chalk.blue(e.varName)} =`, e.data)
})

fetchScript.on('set-option', e => {
  console.log(`  ${chalk.magenta(e.key)} =`, e.data)
})

fetchScript.on('error', e => {
  console.log(chalk.red('ERROR: ' + e.error))
  console.log(e.error)
})

function toUser () {
  prompt(
    '$ ',
    function (input) {
      fetchScript.executeCode(input).then(toUser)
    },
    function (err) {
      console.error('unable to read: ' + err)
    }
  )
}

toUser()
