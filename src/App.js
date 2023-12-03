import './App.css';
import React, {useState, useEffect /*, useRef */} from 'react';
import axios from 'axios';
import AccountValues from './components/AccountValues';
import ActiveAccounts from './accounts/ActiveAccounts';


function App() {

  const [accounts, setAccounts] = useState(ActiveAccounts);
 
  useEffect(_ => {
    updatePrices();
    setInterval(updatePrices, 45000);
    // eslint-disable-next-line
  }, []);
 

  function updatePrices() {
      function getCoinList(accounts) {
        const ids = new Set();
        return Array.from (accounts.reduce((acc,curr) => {
          acc.add(curr.id);
          return acc;
        }, ids));
      }
  
      urlWithAxios (
        'get',
        'https://api.coingecko.com/api/v3/simple/price',
        {params: {
          'ids': getCoinList(accounts).join(','),
          'vs_currencies': 'usd'
        }}
      ).then(response => {
        setAccounts(accounts.map(account => {
          if (['bitcoin', 'litecoin', 'digibyte', 'monero', 'bitcoin-gold', 'bitcoin-diamond'].includes(account.id)) {
            console.info(`${account.id} current $${response.data[account.id].usd}`);
          }
          account.price = response.data[account.id].usd;
          return account;
        }));

      })
      .catch(error=>{console.info('Got API error', error);});
      
  }


  function urlWithAxios(method, url, options = {}) {

    const axiosParams = {
      method: method,
      url: url,
      timeout: 500,
      ...options
    };
   
    console.info('urlWithAxios axiosParams', axiosParams);
  
    return axios(axiosParams);
  }

  
  return (
    <div className="App">

      <header className="App-header">
      <AccountValues
        accounts={accounts}
      > 
      </AccountValues>

      </header>


    </div>
  );
}

export default App;
