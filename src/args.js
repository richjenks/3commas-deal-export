const yargs       = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv        = yargs(hideBin(process.argv)).argv

// From defaults to yesterday
let date = new Date()
date.setDate(date.getDate() - 1)
let from = date.toISOString()

// Default options or CLI options, if provided
module.exports = {
	from:  argv.from  || from,
	scope: argv.scope || null
}
