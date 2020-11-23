import './App.css';
import React, {useState} from 'react';
import Modal from 'react-modal';
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

  function closeLoginModal() {
    console.info('closeLoginModal()');
    setIsLoggedIn(true);
  }

  console.info('Isloggedin', isLoggedIn);
  
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
              const passwd = '';

              const accounts = {
                BTCD: 'VTJGc2RHVmtYMThiYmF5QWtFMzYraDR2RmxUbnpnOWpIUWdVZnZVNk1jRT0=',
                DGBT: 'VTJGc2RHVmtYMThIdHZFRmlZd1MyS0UyekQ0Uk5lZFVzSExZamhacE1Xaz0=',
                XMRT: 'VTJGc2RHVmtYMTlUYUFBMGxMVnJEWEkzamZESk16TVlVK0RheWFUdHVqZz0=',
              
              }
              Object.keys(accounts).forEach(key=>console.info(`Acct ${key} val ${decryptWithAES(accounts[key], passwd)}`));



              const enc = encryptWithAES('7.63', passwd);
              const dec = decryptWithAES(enc, passwd);
              console.info('enc1', enc, 'dec btc', dec);
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