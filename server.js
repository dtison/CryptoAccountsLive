const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
 
const axios = require('axios');
const dotenv = require("dotenv");

dotenv.config({ path: "./server.config.env" });

const accounts = [
  {
    name: 'BTC',
    symbol: 'BTC',
    type: 'VTJGc2RHVmtYMThiYmF5QWtFMzYraDR2RmxUbnpnOWpIUWdVZnZVNk1jRT0='
  },
  {
    name: 'Tiferet DGB',
    symbol: 'DGB',
    type: 'VTJGc2RHVmtYMThIdHZFRmlZd1MyS0UyekQ0Uk5lZFVzSExZamhacE1Xaz0='
  },
  {
    name: 'Tiferet XMR',
    symbol: 'XMR',
    type: 'VTJGc2RHVmtYMTlUYUFBMGxMVnJEWEkzamZESk16TVlVK0RheWFUdHVqZz0='
  },
  {
    name: 'Tiferet LTC',
    symbol: 'LTC',
    type: 'VTJGc2RHVmtYMThuck91QVRXdks1UHQ2NUlqSWxtM3RBSzArNkxFUSs4UT0='
  },

  {
    name: 'Tiferet ETH',
    symbol: 'ETH',
    type: 'VTJGc2RHVmtYMThyaWU3VVVWcHZ3dlBONXNLZkRTL0dFcjRIWFlwYi9iND0='
  },
  {
    name: 'Tiferet BCH',
    symbol: 'BCH',
    type: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
  },
  {
    name: 'Tiferet BSV',
    symbol: 'BSV',
    type: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
  },
  {
    name: 'EOS',
    symbol: 'EOS',
    type: 'VTJGc2RHVmtYMS9JM0RIcVZweElyZU5WSlBUeGxKb0g4Z21iMWRQbFg0dz0='
  },   
  {
    name: 'OMG',
    symbol: 'OMG',
    type: 'VTJGc2RHVmtYMTh3YnNEWEl5ZXhjNWJ6eDJmYXQzU3NrZWVHM1BmZE5wdz0='
  },   
  // Todo: Add BAT, ANT GNT, BTG
  {
    name: 'LTC Dtison II',
    symbol: 'LTC',
    type: 'VTJGc2RHVmtYMS9NUEpMTEFKTUUvMG0zSG9qZlY5Q0ZuRkUzWVJHeUtobz0='
  },    
  {
    name: 'BCH Dtison II',
    symbol: 'BCH',
    type: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
  },   
  {
    name: 'BSV Dtison II',
    symbol: 'BSV',
    type: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
  },   
  {
    name: 'ETH Dtison III',
    symbol: 'ETH',
    type: 'VTJGc2RHVmtYMTh0aG8xcjczekZoeHFqZlhEZzhFci9oMDVwR1FZRjFHaz0='
  },  
  {
    name: 'NMR Dtison III',
    symbol: 'NMR',
    type: 'VTJGc2RHVmtYMTl4cS90clVwMDhwUUtRUENiQjBFZlVMU0t6OGZwK2dTYz0='
  },  
  {
    name: 'XMR',
    symbol: 'XMR',
    type: 'VTJGc2RHVmtYMThKeDZXNHArK2pYcmxMNzFKVE5EUlNnQnZWRjFWcGxzcz0='
  },  

];
  
accounts.length = 2;

let prices = [];

const hourly = 60 * 60000;
const every10Seconds = 10000;
const every30Seconds = 30000;

setTimeout(updatePrices, 500);
setInterval(updatePrices, every30Seconds);

function updatePrices() {

  accounts.forEach(account => {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${account.symbol}&CMC_PRO_API_KEY=f1920a9b-6a47-4217-85ff-1f9cae952027`;
    console.info('Axios getting', url);
    axios.get(url)
      .then(response => {
        account.price = response.data.data[account.symbol].quote.USD.price;
        console.info('after updating, account is', account);
      })
      .catch(error=>{console.info('Got error', error);});
  });

}


const app = express();

app.use(express.json());

app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  let eventInterval = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(accounts)}\n\n`);
  }, 5000);

  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));



/*   const index = 0;
  const account = accounts[index];
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${account.symbol}&CMC_PRO_API_KEY=f1920a9b-6a47-4217-85ff-1f9cae952027`;
  console.info('Axios getting', url);
  axios.get(url)
    .then(response => {

      accounts[index].price = response.data.data[account.symbol].quote.USD;
      accounts[index].qty = 0;
      console.info('axios response was', response.data.data[account.symbol].quote.USD);
    })
    .catch(error=>{console.info('Got error', error);}) */



/*   setTimeout(_=>{
    console.info('Displaying it all');
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&CMC_PRO_API_KEY=f1920a9b-6a47-4217-85ff-1f9cae952027')
      .then(response => {
        console.info('axios response was', response);
      })

    accounts.forEach(coin=>{
      // axios.get('/user?ID=12345')
      // .then(function (response) {
      //   // handle success
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   // handle error
      //   console.log(error);
      // }) 
     // console.info(`${coin.name} ${decryptWithAES(coin.value, passwd)}`));
    });
  }, 1000);
 */


/* 
const getData = () => {
    var productList = [];

    let isChange = false;
    if (Math.floor(Math.random() * 3) === 0) {
        console.info('DATA WILL CHANGE');
        isChange = true;
    }
    for (let i = 0; i < 1; i++) {
//        productList.push({ Id: i + 1, Title: `Product ${i + 1}`, Price: Math.floor(Math.random() * 100000) + 5000 });
        productList.push({ Id: i + 1, Title: `Product ${i + 1}`, Price: (isChange ? Math.floor(Math.random() * 100000) + 5000 : 10.00) });

    }
    return productList;
} */
