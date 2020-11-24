import React, { useState, useContext, useEffect } from 'react';
import AES from '../lib/AES';

const Estimate = props => {
 
 // const [schemeElement, setSchemeElement] = useState(RegistrationScheme.getNullElement());
console.info('accounts len is', props.accounts.length);
 // useEffect(RegistrationScheme.getRegistrationEffect(context, setSchemeElement), []);
  return (
    <>
    Accounts

    <div className="flex flex-wrap overflow-hidden">
    {props.accounts.map((account, index) => {
      const value = parseFloat(AES.decryptFromBase64(account.type, props.password));

      return (
      <div key={index} className="w-1/4 overflow-hidden">
      {account.name} ${(value * account.price).toLocaleString('en-US', {maximumFractionDigits:2})}
      </div>  );  
    })}

    <div className="w-1/4 overflow-hidden">
     Total ${
      props.accounts.reduce((acc,curr) => {
        const value = parseFloat(AES.decryptFromBase64(curr.type, props.password));
          return acc + (value * curr.price);
      }, 0).toLocaleString('en-US', {maximumFractionDigits:2})
    }
    </div> 
    </div>
    </>
  );
};

export default Estimate;
 