#!/usr/bin/env node

const dotenv         = require("dotenv")
const threeCommasAPI = require('3commas-api-node')

dotenv.config()
const tc = new threeCommasAPI({
	apiKey:    process.env.TC_API_KEY,
	apiSecret: process.env.TC_API_SECRET,
})

tc
.getBots()
.then(bots => {
	let data = []
	bots.forEach(bot => {
		data.push({
			id:      bot.id,
			name:    bot.name,
			deals:   bot.active_deals_count + "/" + bot.max_active_deals,
			enabled: bot.is_enabled
		})
	})
	console.table(data)
})
.catch(error => console.log(error))
