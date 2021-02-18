# 3commas Active Deal Exporter

3commas has a CSV export feature for deal history but not for active deals...so I built one.

It uses the same headings and formatting as the history CSV so you can easily compare active deals with closed ones.

## Usage

- Run `npm install`
- Rename `.sample.env` to `.env`
- [Create a 3commas API token](https://3commas.io/api_access_tokens) with `Bots Read` and `Accounts Read` permissions
- Add the API Key and API Secret to `.env`
- Run `node 3c.js`

You'll find the file in the `csv` folder.

## Data Accuracy

Note that some data is not fixed and is only accurate at the time you run the script. For example, `final_profit` will be based on the current deal's value because the actual profit is not known until the deal is closed.

It should, at least, provide accurate data if you were to close the deal at the same time as running the script.

## Limitations

Some limitations of the 3commas API:

- Only the 1,000 most recently opened deals will be included
- The only way to switch between Real and Paper accounts is by logging into https://3commas.io/
- If the bot has multiple deal start conditions it's impossible to tell which one triggered the deal, so all are listed
