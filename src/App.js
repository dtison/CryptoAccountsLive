import './App.css';
import React, {useState, useEffect /*, useRef */} from 'react';
import Modal from 'react-modal';
import AES from './lib/AES';
import axios from 'axios';
import AccountValues from './components/AccountValues';
import ActiveAccounts from './accounts/ActiveAccounts';

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



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState(ActiveAccounts);
 

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
        console.info('Updating endpoint data');
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
      {isLoggedIn && <AccountValues
        accounts={accounts}
        password = {process.env.REACT_APP_PASSWORD}
      ></AccountValues>}

      </header>

         <Modal
          isOpen={! isLoggedIn}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2
            onClick={e=>{
              const passwd = process.env.REACT_APP_PASSWORD;
              const enc = AES.encryptToBase64('1.0', passwd);
              const dec = AES.decryptFromBase64(enc, passwd);
              console.info('base 64 value', enc, 'numeric', dec);
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
