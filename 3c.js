const fs = require('fs')
const dotenv = require("dotenv")
const { Parser } = require('json2csv')
const dateFormat = require("dateformat");
const threeCommasAPI = require('3commas-api-node')

// API auth
dotenv.config()
const api = new threeCommasAPI({
	apiKey: process.env.API_KEY,
	apiSecret: process.env.API_SECRET,
})

// API promises
const account = api.accounts()
const bots    = api.getBots()
const deals   = api.getDeals({
	scope: 'active',
	limit: 1000,
})

// data.push() all the things
let data = []

// Patience, young padawan
Promise.all([account, bots, deals]).then(responses => {

	// Deconstruct responses
	let [account, bots, deals] = responses
	let account_name = account[0].name

	// Construct array of data
	deals.forEach(deal => {

		// Data massaging
		let bot = bots.find(bot => bot.id = deal.bot_id)
		let signals =
			(bot.strategy_list.length === 1)
			? JSON.stringify(bot.strategy_list[0])
			: JSON.stringify(bot.strategy_list)
		let take_profit_type =
			(deal.take_profit_type === 'total')
			? 'total_bought_volume' // total
			: 'base_order_volume'   // base
		let created_at = dateFormat(deal.created_at, 'dd/mm/yyyy HH:MM:ss')
		let duration = Math.round((new Date - new Date(deal.created_at)) / 1000)

		// Same format as Deal History CSV
		data.push({
			'deal_id'                                : deal.id,
			'status'                                 : deal.status,
			'bot'                                    : deal.bot_name,
			'account'                                : account_name,
			'bot_id'                                 : deal.bot_id,
			'bot_pairs'                              : bot.pairs.length,
			'strategy'                               : deal.strategy,
			'signals'                                : signals,
			'pair'                                   : deal.pair,
			'take_profit_condition'                  : deal.take_profit,
			'safety_order_volume / base_order_volume': deal.safety_order_volume / deal.base_order_volume,
			'safety_order_step_percentage'           : deal.safety_order_step_percentage,
			'take_profit_type'                       : take_profit_type,
			'created_at'                             : created_at,
			'closed_at'                              : deal.closed_at,
			'duration'                               : duration,
			'profit_percentage_from_total_volume'    : deal.sold_volume / deal.bought_volume,
			'profit_percentage_from_base_volume'     : deal.sold_volume / deal.base_order_volume,
			'max_safety_orders_count'                : deal.max_safety_orders,
			'active_safety_orders_count'             : deal.active_safety_orders_count,
			'used_safety_orders'                     : deal.completed_safety_orders_count,
			'martingale_volume_coefficient'          : deal.martingale_volume_coefficient,
			'martingale_step_coefficient'            : deal.martingale_step_coefficient,
			'safety_order_volume'                    : deal.safety_order_volume,
			'safety_order_volume_type'               : deal.safety_order_volume_type,
			'base_order_volume'                      : deal.base_order_volume,
			'base_order_volume_type'                 : deal.base_order_volume_type,
			'bought_volume'                          : deal.bought_volume,
			'sold_volume'                            : deal.sold_volume,
			'bought_amount'                          : deal.bought_amount,
			'sold_amount'                            : deal.sold_amount,
			'final_profit'                           : deal.final_profit,
			'close_date'                             : deal.closed_at,
		})
	})

	// Convert to CSV
	const json = JSON.stringify(data)
	const parser = new Parser;
	const csv = parser.parse(data)

	// Save to file
	const file = './csv/' + dateFormat(new Date, 'yyyy-mm-dd-HH-MM-ss') + '.csv'
	console.log('Saved to ' + file)
	fs.writeFile(file, csv, e => { if (e) { console.log(e) } })

})
