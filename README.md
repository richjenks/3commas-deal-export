# 3commas Deal Exporter

Command line tool for generating CSV files containing deal data with support for active and finished deals.

It aimes to solve three problems:

1. History exports are limited to once every 10 minutes
1. You can't export data for active deals
1. API responses are limited to 1000 rows // TODO

## Usage

- Run `npm install`
- Rename `.sample.env` to `.env`
- [Create a 3commas API token](https://3commas.io/api_access_tokens) with `Bots Read` and `Accounts Read` permissions
- Add the API Key and API Secret to `.env`
- Run `node export`

You'll find the file in the `csv` folder.

## Options

### scope

Only include deals with the specified status:

- `active`: Active deals
- `finished`: Finished deals
- `completed`: Successfully completed
- `cancelled`: Cancelled deals
- `failed`: Failed deals
- any other value or null (default): all deals

### from

Only include deals created after the specified datetime. You must include year, month and day but time is optional. Some examples:

- 2021-04-20
- 2021-04-20T16
- 2021-04-20T16:20
- 2021-04-20T16:20:00

## Data Accuracy

Note that some data is not fixed and is only accurate at the time you run the script. For example, when exporting active deals, `final_profit` will be based on the current deal's value because the actual profit is not known until the deal is closed.

It should, at least, provide accurate data if you were to close the deal at the same time as running the script.

## Limitations

Some limitations of the 3commas API:

- Only the 1,000 most recently opened deals will be included
- The only way to switch between Real and Paper accounts is by logging into https://3commas.io/
- If the bot has multiple deal start conditions it's impossible to tell which one triggered the deal, so all are listed
