# Crypto Accounts Live

Blockchain Assets Portfolio Live Values

Some of you have mined or bought cryptos and stored them into multiple wallets. If that applies to you and you want to see an overview of your investment, this application is for you.  

PICTURE

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### How to Use

To use this all you have to do is copy or rename the file

src/accounts/ActiveAccounts.example.js 

to 

src/accounts/ActiveAccounts.js 

and edit according to your needs.  

You can look in the file coingecko-all.txt to find the *id* value for whatever coin you want.

You add as few or as many records as you want displayed.

### Some Examples:

You have 0.255 BTC, 1.0 ETH and 2.5 LTC

```
const activeAccounts = [
  {
    name: 'BTC',
    id: 'bitcoin',
    qty: 0.255
  },
  {
    name: 'ETH',
    id: 'ethereum',
    qty: 1.0
  },
  {
    name: 'LTC',
    id: 'litecoin',
    qty: 2.5
  },

];
```


You have 4,400 Cardano (ADA) and 300 EOS

```
const activeAccounts = [
  {
    name: 'Cardano (ADA)',
    id: 'ada',
    qty: 4400
  },
  {
    name: 'EOS',
    id: 'eos',
    qty: 300
  },
];
```
More


