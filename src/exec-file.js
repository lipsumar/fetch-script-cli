const chalk = require('chalk')
const fs = require('fs')
const FetchScript = require('fetch-script')
const fetchScript = new FetchScript()

module.exports = filePath => {
  fetchScript.on('out', out => {
    console.log('>', out.data)
  })

  fetchScript.on('set-var', e => {
    process.stdout.write(`  ${chalk.blue(e.varName)} = `)
    if (e.data instanceof Array) {
      const shown = e.data.slice(0, 2)
      console.dir(shown, { depth: 1, colors: true })
      if (shown.length !== e.data.length) {
        console.log('  ... +' + (e.data.length - shown.length))
      }
    } else {
      console.dir(e.data, { depth: 1, colors: true })
    }
  })

  fetchScript.on('set-option', e => {
    console.log(`  ${chalk.magenta(e.key)} =`, e.data)
  })

  fetchScript.on('error', e => {
    console.log(chalk.red('ERROR: ' + e.error))
  })

  fetchScript.on('command', e => {
    console.log(chalk.yellow('$ ' + e.command))
  })

  const commands = fs
    .readFileSync(filePath, { encoding: 'utf-8' })
    .split('\n')
    .filter(p => p.trim() !== '')

  fetchScript.execute(commands)
}
