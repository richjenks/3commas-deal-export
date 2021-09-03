const { Parser } = require('json2csv')
const dateFormat = require("dateformat")
const fs         = require('fs')

module.exports = {
	toFile: data => {

		// Convert to CSV
		const json = JSON.stringify(data)
		const parser = new Parser;
		const csv = parser.parse(data)

		// Save to file
		const file = './csv/' + dateFormat(new Date, 'yyyy-mm-dd-HH-MM-ss') + '.csv'
		fs.writeFile(file, csv, e => { if (e) { console.log(e) } })

		// Be kind, rewind
		return file
	}
}
