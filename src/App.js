import './App.css';
import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const CryptoJS = require('crypto-js');

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


function encryptWithAES (text, passphrase) {
  return btoa(CryptoJS.AES.encrypt(text, passphrase).toString());
};

function decryptWithAES (text, passphrase) {
  const bytes = CryptoJS.AES.decrypt(atob(text), passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const accounts = [
    {
      name: 'BTC',
      type: 'BTC',
      value: 'VTJGc2RHVmtYMThiYmF5QWtFMzYraDR2RmxUbnpnOWpIUWdVZnZVNk1jRT0='
    },
    {
      name: 'Tiferet DGB',
      type: 'DGB',
      value: 'VTJGc2RHVmtYMThIdHZFRmlZd1MyS0UyekQ0Uk5lZFVzSExZamhacE1Xaz0='
    },
    {
      name: 'Tiferet XMR',
      type: 'XMR',
      value: 'VTJGc2RHVmtYMTlUYUFBMGxMVnJEWEkzamZESk16TVlVK0RheWFUdHVqZz0='
    },
    {
      name: 'Tiferet LTC',
      type: 'LTC',
      value: 'VTJGc2RHVmtYMThuck91QVRXdks1UHQ2NUlqSWxtM3RBSzArNkxFUSs4UT0='
    },

    {
      name: 'Tiferet ETH',
      type: 'ETH',
      value: 'VTJGc2RHVmtYMThyaWU3VVVWcHZ3dlBONXNLZkRTL0dFcjRIWFlwYi9iND0='
    },
    {
      name: 'Tiferet BCH',
      type: 'BCH',
      value: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
    },
    {
      name: 'Tiferet BSV',
      type: 'BSV',
      value: 'VTJGc2RHVmtYMSszQTZ5WENWNU9aOE9DT1FkOHdnQTBmOEJVWWhMQisrbz0='
    },
    {
      name: 'EOS',
      type: 'EOS',
      value: 'VTJGc2RHVmtYMS9JM0RIcVZweElyZU5WSlBUeGxKb0g4Z21iMWRQbFg0dz0='
    },   
    {
      name: 'OMG',
      type: 'OMG',
      value: 'VTJGc2RHVmtYMTh3YnNEWEl5ZXhjNWJ6eDJmYXQzU3NrZWVHM1BmZE5wdz0='
    },   
    // Todo: Add BAT, ANT GNT, BTG
    {
      name: 'LTC Dtison II',
      type: 'LTC',
      value: 'VTJGc2RHVmtYMS9NUEpMTEFKTUUvMG0zSG9qZlY5Q0ZuRkUzWVJHeUtobz0='
    },    
    {
      name: 'BCH Dtison II',
      type: 'BCH',
      value: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
    },   
    {
      name: 'BSV Dtison II',
      type: 'BSV',
      value: 'VTJGc2RHVmtYMTg5NzIraGl5OFdOd2l3eU5VSEVIRVBCZHhQVTNFeEl0UT0='
    },   
    {
      name: 'ETH Dtison III',
      type: 'ETH',
      value: 'VTJGc2RHVmtYMTh0aG8xcjczekZoeHFqZlhEZzhFci9oMDVwR1FZRjFHaz0='
    },  
    {
      name: 'NMR Dtison III',
      type: 'NMR',
      value: 'VTJGc2RHVmtYMTl4cS90clVwMDhwUUtRUENiQjBFZlVMU0t6OGZwK2dTYz0='
    },  
    {
      name: 'XMR',
      type: 'XMR',
      value: 'VTJGc2RHVmtYMThKeDZXNHArK2pYcmxMNzFKVE5EUlNnQnZWRjFWcGxzcz0='
    },  
  ];


  function closeLoginModal() {
    console.info('closeLoginModal()');
    setIsLoggedIn(true);
  }

  console.info('Isloggedin', isLoggedIn);
  
  setTimeout(_=>{
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

  return (
    <div className="App">
      <header className="App-header">

      {isLoggedIn && 'Estimate Component here'}
      </header>
         <Modal
          isOpen={! isLoggedIn}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2
            onClick={e=>{
              const passwd = process.env.REACT_APP_PASSWORD;

              accounts.forEach(coin=>console.info(`${coin.name} ${decryptWithAES(coin.value, passwd)}`));

              const enc = encryptWithAES('0.0', passwd);
              const dec = decryptWithAES(enc, passwd);
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