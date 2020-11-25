import React, { /* useState, useContext, useEffect */ } from 'react';

const AccountValues = props => {

  return (
    <>
    CryptoCurrency Values

    <div className="flex flex-wrap overflow-hidden">
    {props.accounts.map((account, index) => {

      return (
      <div key={index} className="w-1/3 overflow-hidden">
      {account.name} ${(account.qty * account.price).toLocaleString('en-US', {maximumFractionDigits:2})}
      </div>  );  
    })}

    <div className="w-1/3 overflow-hidden">
     Total ${
      props.accounts.reduce((acc,curr) => {

          return acc + (curr.qty * curr.price);
      }, 0).toLocaleString('en-US', {maximumFractionDigits:2})
    }
  </div>
 
 
    </div> 
    
    </>
  );
};

export default AccountValues;
 // ${account.price.toLocaleString('en-US', {maximumFractionDigits:2})} 

 //const value = parseFloat(AES.decryptFromBase64(curr.type, props.password));

// const value = parseFloat(AES.decryptFromBase64(account.type, props.password));
