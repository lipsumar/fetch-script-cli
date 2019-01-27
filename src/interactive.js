const prompt = require('cli-prompt')
const chalk = require('chalk')
const FetchScript = require('fetch-script')
const fetchScript = new FetchScript()

fetchScript.on('out', out => {
  console.log('>', out)
})

fetchScript.on('resource', e => {
  // console.log('FETCHED ', e.resource)
})

fetchScript.on('set-var', e => {
  console.log(`  ${chalk.blue(e.varName)} =`, e.data)
})

fetchScript.on('set-option', e => {
  console.log(`  ${chalk.magenta(e.key)} =`, e.data)
})

fetchScript.on('error', e => {
  console.log(chalk.red(e.error))
  console.log(e.error)
})

function toUser () {
  prompt(
    '$ ',
    function (input) {
      try {
        fetchScript.executeCode(input)
          .then(toUser)
          .catch(err => {
            console.log(chalk.red(err.message))
            toUser()
          })
      } catch (err) {
        console.log(chalk.red(err.message))
        toUser()
      }
    },
    function (err) {
      console.error('unable to read: ' + err)
    }
  )
}

toUser()
