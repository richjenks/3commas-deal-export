# 3commas Deal Export

Command line tool for generating CSV exports of your deals.

## Features

This tool is better than the in-app CSV export in several ways:

- Not limited to once every 10 minutes
- Can export active deals, i.e. deals that haven't closed yet
- Automaticaly handles the API's limitation of 1000 records per response

## Requirements

This was developed on the following but has not been tested on previous versions:

- Node v12.16.1
- NPM 7.5.4

## Setup

- Clone this repo and `cd` into it
- Run `npm install`
- Rename `.sample.env` to `.env`
- [Create a 3commas API token](https://3commas.io/api_access_tokens) with `Bots Read` and `Accounts Read` permissions
- Add the API Key and API Secret to `.env`

## Usage

Once Setup, it works out-of-the-box by running `node scripts/export` and you'll find the export in the `csv` folder.

Options:

-  `--mode`: Switch between real and paper modes (default: real)
-  `--scope`: Filter deals by status (default: all statuses)
-  `--from`: Filter by creation data (default: last 24 hours)
-  `--bot`: Filter by bot (default: all bots)
-  `--label`: Add label to output file (default: empty)

### Mode

`--mode` accepts the following options:

- `real` (defaut): Real trading account
- `paper`: Paper trading account

### Scope

`--scope` accepts the following options:

- `active`: Active deals that haven't yet closed
- `finished`: All finished deals, regardless of whether they were successful or not
- `completed`: Only successfully completed deals
- `cancelled`: Only manually cancelled deals
- `failed`: Only failed deals
- any other value or null (default): all deals

### From

`--from` accepts a date (and, optionally, a time) and filters deals to those created after that date.

The default value is 24 hours ago, so with no arguments (and without a `--scope` argument) you'll get all deals of any status created in the last 24 hours.

Some examples:

- 2021-04-20
- 2021-04-20T16
- 2021-04-20T16:20
- 2021-04-20T16:20:00

### Bot

`--bot` accepts the numerical ID of one of your bots and will only return deals it created.

If omitted, results will include data from all bots.

Run `node scripts/bots` to get the IDs for all your bots.

### Label

`--label` accepts a string and appends it to the output file name. It's simply a convenience for when you're doing multiple exports at once and want to remember which is which. For example, to distinguish a real export from a paper one.

Example: `node export --label foo` might create `2021-04-20-12-30-00-foo.csv`.

## Troubleshooting

- **0 deals found**: The `--from` argument defaults to the last 24 hours so if no deals have been created in this period you'll get 0 results.
- **Data accuracy**: All data, including *profit* data, is only accurate at the time this script runs. For example, a `finished` deal's `final_profit` is the profit you made but for `active` deals it's the present value of the position.
- **Multiple deal start conditions**: If the bot has multiple deal start conditions it's impossible for this script to know which one triggered the deal, so all are listed.
