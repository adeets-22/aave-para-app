# aave-para-app

A demo of 1-click deposit into yield-bearing stablecoins — the key idea being that with Para's embedded wallet SDK and Aave, a user can deposit into compliant, yield-bearing assets with one click.

## How It Works

This app combines [Para](https://www.getpara.com/)'s embedded wallet with [Aave](https://aave.com)'s lending protocol to enable a single-click deposit flow:

1. A user signs up or logs in via Para's embedded wallet (no browser extension required).
2. The app constructs and submits an Aave supply transaction on behalf of the user.
3. The user receives yield-bearing aTokens representing their deposit — all in one step.

## Getting Started

You can run this app with a regular API key from Para. To set permissions yourself, [get in touch with us](https://getpara.com/talk-to-us) or view the [hosted demo](TODO).
