const dotenv         = require("dotenv")
const threeCommasAPI = require('3commas-api-node')

module.exports = {

	// 3Commas API Client
	tc: () => {
		dotenv.config()
		return new threeCommasAPI({
			apiKey:    process.env.TC_API_KEY,
			apiSecret: process.env.TC_API_SECRET,
		})
	},

	// Get currently selected account - can only be switched in 3Commas Web UI
	account: () => {
		return module.exports.tc().accounts()
	},

	// Get bots in account
	bots: () => {
		return module.exports.tc().getBots()
	},

	// Get all deals
	deals: async (from, scope, bot) => {

		// Liftoff!
		process.stdout.write('Fetching..')

		// Pagination stuff
		let deals  = []    // deals.push all the deals
		let limit  = 1000  // Number of items per page
		let offset = 0     // Offset to get results from
		let more   = false // Length of previous response

		// Get next page if current page has max number of deals
		do {

			// Get single page of deals
			const result =
			await module.exports.getDeals(from, scope, bot, limit, offset)
			.catch(e => console.log(e))

			// If this page has results, prep for next page
			if (result.length) {
				offset += limit
				deals.push(...result)
				process.stdout.write('.')
			}

			// Exit condition
			more = (result.length === limit)

		} while (more)

		// Confirm completion
		process.stdout.write('done!')
		process.stdout.write('\n')

		return deals
	},

	// Gets a single page of deals
	getDeals: async (from, scope, bot, limit, offset) => {
		return new Promise(resolve => {
			module.exports.tc().getDeals({
				from:   from,
				scope:  scope,
				bot_id: bot,
				limit:  limit,
				offset: offset
			})
			.then(deals => {
				resolve(deals)
			})
			.catch(error => console.log(error))
		})
	}

}
