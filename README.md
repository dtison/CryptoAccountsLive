# Crypto Accounts Live

*Blockchain Assets Portfolio Live Values*

Some of you have either mined or bought cryptos and stored them into multiple wallets. 
Most wallets and exchanges will show you the total value of your portfolio.
If you want to see the current market value of all your assets using live market data, this application is for you.  

![Portfolio](https://user-images.githubusercontent.com/1645537/100275428-e5c72700-2f2d-11eb-8230-83ae6bb1ed3c.png)  

### How to Use

This is a React.js app.  

Basic steps are

Clone repo

```CryptoAccountsLive
npm install
npm start
```
### Configuration ###

You have to initialize your data.  To do this, copy or rename the file

src/accounts/ActiveAccounts.example.js 

to 

src/accounts/ActiveAccounts.js 

and edit contents according to your needs.  

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
### TODO's & Contributing ###

I just started this application.

There are a lot of things left to do.

Formatting / CSS  If you are good with this you are welcome to work on styling.  I chose tailwind because I don't like bootstrap.

Setting for API refresh interval.



### Thanks ###
Special thanks to

https://www.coingecko.com/

for providing a nice, free REST API.  

More details at

https://www.coingecko.com/en/api
