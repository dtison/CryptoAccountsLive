import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';
import AES from './lib/AES';
import axios from 'axios';
import Estimate from './components/Estimate';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const accountsData = [
  {
    name: 'BTC',
    id: 'bitcoin',
    type: 'VTJGc2RHVmtYMThiYmF5QWtFMzYraDR2RmxUbnpnOWpIUWdVZnZVNk1jRT0='
  },
  {
    name: 'Tiferet DGB',
    id: 'digibyte',
    type: 'VTJGc2RHVmtYMThIdHZFRmlZd1MyS0UyekQ0Uk5lZFVzSExZamhacE1Xaz0='
  },
  {
    name: 'Tiferet XMR',
    id: 'monero',
    type: 'VTJGc2RHVmtYMTlUYUFBMGxMVnJEWEkzamZESk16TVlVK0RheWFUdHVqZz0='
  },
  {
    name: 'Tiferet LTC',
    id: 'litecoin',
    type: 'VTJGc2RHVmtYMThuck91QVRXdks1UHQ2NUlqSWxtM3RBSzArNkxFUSs4UT0='
  },

  {
    name: 'Tiferet ETH',
    id: 'ethereum',
    type: 'VTJGc2RHVmtYMThyaWU3VVVWcHZ3dlBONXNLZkRTL0dFcjRIWFlwYi9iND0='
  },
  {
    name: 'Tiferet BCH',
    id: 'bitcoin-cash',
    type: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
  },
  {
    name: 'Tiferet BSV',
    id: 'bitcoin-cash-sv',
    type: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
  },
  {
    name: 'EOS',
    id: 'eos',
    type: 'VTJGc2RHVmtYMS9JM0RIcVZweElyZU5WSlBUeGxKb0g4Z21iMWRQbFg0dz0='
  },   
  {
    name: 'OMG',
    id: 'omisego',
    type: 'VTJGc2RHVmtYMTh3YnNEWEl5ZXhjNWJ6eDJmYXQzU3NrZWVHM1BmZE5wdz0='
  },   
  // Todo: Add BAT, ANT GNT, BTG
  {
    name: 'LTC Dtison II',
    id: 'litecoin',
    type: 'VTJGc2RHVmtYMS9NUEpMTEFKTUUvMG0zSG9qZlY5Q0ZuRkUzWVJHeUtobz0='
  },    
  {
    name: 'BCH Dtison II',
    id: 'bitcoin-cash',
    type: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
  },   
  {
    name: 'BSV Dtison II',
    id: 'bitcoin-cash-sv',
    type: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
  },   
  {
    name: 'ETH Dtison III',
    id: 'ethereum',
    type: 'VTJGc2RHVmtYMTh0aG8xcjczekZoeHFqZlhEZzhFci9oMDVwR1FZRjFHaz0='
  },  
  {
    name: 'NMR Dtison III',
    id: 'numeraire',
    type: 'VTJGc2RHVmtYMTl4cS90clVwMDhwUUtRUENiQjBFZlVMU0t6OGZwK2dTYz0='
  },  
  {
    name: 'XMR',
    id: 'monero',
    type: 'VTJGc2RHVmtYMThKeDZXNHArK2pYcmxMNzFKVE5EUlNnQnZWRjFWcGxzcz0='
  },  

];


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState(accountsData);
 

  useEffect(_ => {
    updatePrices();
    setInterval(updatePrices, 45000);
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
        console.info('accounts', JSON.stringify(accounts));
        setAccounts(accounts.map(account => {
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
      timeout: 300,
      ...options
    };
   
    console.info('urlWithAxios axiosParams', axiosParams);
  
    return axios(axiosParams);
  }



  function closeLoginModal() {
    console.info('closeLoginModal()');
    setIsLoggedIn(true);
  }

 // console.info('Isloggedin', isLoggedIn);

  
  return (
    <div className="App">

      <header className="App-header">
      {isLoggedIn && <Estimate
        accounts={accounts}
        password = {process.env.REACT_APP_PASSWORD}
      ></Estimate>}

      </header>

         <Modal
          isOpen={! isLoggedIn}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2
            onClick={e=>{
              const passwd = process.env.REACT_APP_PASSWORD;
// TODO:  Loop thru SSE data?
   //           accounts.forEach(coin=>console.info(`${coin.name} ${AES.decryptFromBase64(coin.value, passwd)}`));

              const enc = AES.encryptToBase64('0.0', passwd);
              const dec = AES.decryptFromBase64(enc, passwd);
              console.info('enc1', enc, 'latest v', dec);
            }}
          >
            Login
          </h2>
 
          <form>
            <input />
 
            <button onClick={closeLoginModal}>Login</button>

          </form>
        </Modal> 


    </div>
  );
}

export default App;
/* 
         <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>   */



          /*         onAfterOpen={_=>{
            console.info('onAfterOpen Setting LoggedIn = true');
            setIsLoggedIn(true);
          }} */
       //   onRequestClose={closeLoginModal}

                   //ref={_subtitle => (subtitle = _subtitle)}  

                   //https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&CMC_PRO_API_KEY=f1920a9b-6a47-4217-85ff-1f9cae952027