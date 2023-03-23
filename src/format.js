const dateFormat = require("dateformat")

module.exports = {
	deals: (deals, bots, account) => {

		// Store formatted data here
		let formatted = []

		// Format each deal as per 3Commas' own CSV export
		deals.forEach(deal => {

			// Data massaging
			let account_name = account[0].name
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
			let closed_at = dateFormat(deal.closed_at, 'dd/mm/yyyy HH:MM:ss')
			let close_date = dateFormat(deal.closed_at, 'dd/mm/yyyy')
			let duration = Math.round((new Date - new Date(deal.created_at)) / 1000)

			// Same format as Deal History CSV
			formatted.push({
				'deal_id': deal.id,
				'status': deal.status,
				'bot': deal.bot_name,
				'account': account_name,
				'bot_id': deal.bot_id,
				'bot_pairs': bot.pairs.length,
				'strategy': deal.strategy,
				'signals': signals,
				'pair': deal.pair,
				'take_profit_condition': deal.take_profit,
				'safety_order_volume / base_order_volume': deal.safety_order_volume / deal.base_order_volume,
				'safety_order_step_percentage': deal.safety_order_step_percentage,
				'take_profit_type': take_profit_type,
				'created_at': created_at,
				'closed_at': closed_at,
				'duration': duration,
				'profit_percentage_from_total_volume': deal.sold_volume / deal.bought_volume,
				'profit_percentage_from_base_volume': deal.sold_volume / deal.base_order_volume,
				'max_safety_orders_count': deal.max_safety_orders,
				'active_safety_orders_count': deal.active_safety_orders_count,
				'used_safety_orders': deal.completed_safety_orders_count,
				'martingale_volume_coefficient': deal.martingale_volume_coefficient,
				'martingale_step_coefficient': deal.martingale_step_coefficient,
				'safety_order_volume': deal.safety_order_volume,
				'safety_order_volume_type': deal.safety_order_volume_type,
				'base_order_volume': deal.base_order_volume,
				'base_order_volume_type': deal.base_order_volume_type,
				'bought_volume': deal.bought_volume,
				'sold_volume': deal.sold_volume,
				'bought_amount': deal.bought_amount,
				'sold_amount': deal.sold_amount,
				'final_profit': deal.actual_profit,
				'close_date': close_date,
				'note': deal.note,
			})
		})

		// The droids you're looking for
		return formatted
	}
}
