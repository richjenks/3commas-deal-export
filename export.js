#!/usr/bin/env node

// Internal packages
const args   = require('./src/args')
const api    = require('./src/api')
const format = require('./src/format')
const save   = require('./src/save')

// Promises for API data
const deals   = api.deals(args.from, args.scope, args.bot)
const account = api.account()
const bots    = api.bots()

// Wait for data then...
Promise
.all([deals, account, bots])
.then(responses => {

	// Deconstruct responses
	let [deals, account, bots] = responses

	// Exit early if there aren't any results
	if (!deals.length) {
		console.error('0 deals found — have you checked the README?')
		process.exit(1)
	}

	// Format and output to CSV
	const data = format.deals(deals, bots, account)
	const file = save.toFile(data)
	console.log(deals.length + ' deals saved to ' + file)

})
.catch(e => console.log(e))
