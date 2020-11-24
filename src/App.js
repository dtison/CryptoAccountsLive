import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-modal';

import DeepEqual from 'deep-equal';
import AES from './lib/AES';

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
  const [sseData, setSSEData] = useState([]);
  const sseDataRef = useRef(null);

  useEffect(_ => {
    sseDataRef.current = sseData;
    const eventSource = new EventSource("http://localhost:8000/stream");
    eventSource.onmessage = message => {
      const data = JSON.parse(message.data);
      if (sseDataRef.current.length === 0) {
        sseDataRef.current = data;
      }
      console.info(`Comparing ${JSON.stringify(sseDataRef.current)} ${JSON.stringify(data)}`);
      if (! DeepEqual(sseDataRef.current, data)) {
        console.info('New SSE Data received', data);
        setSSEData(data);
      }
   //   console.info(JSON.parse(e.data)); 
    
    }
  }, []);


  useEffect(_ => {
    console.info('It looks like state sseData has updated');
  }, [sseData]);






  function closeLoginModal() {
    console.info('closeLoginModal()');
    setIsLoggedIn(true);
  }

 // console.info('Isloggedin', isLoggedIn);

  
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