import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import Modal from 'react-modal';

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

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  function closeLoginModal() {
    setIsLoggedIn(false);
  }
  
  return (
    <div className="App">
      <header className="App-header">

        HEADER
      </header>
         <Modal
          isOpen={isLoggedIn}
          onAfterOpen={_=>{setIsLoggedIn(true)}}
          onRequestClose={closeLoginModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 
            //ref={_subtitle => (subtitle = _subtitle)}
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
{/* 
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
        </a>   */}