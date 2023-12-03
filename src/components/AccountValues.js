import React, { /* useState, useContext, useEffect */ } from 'react';
import GroupTotal from './GroupTotal';

const AccountValues = props => {

  return (
    <>
    <p>
      My Portfolio Market Values
    </p>


    <div className="flex flex-wrap overflow-hidden">
    {props.accounts.map((account, index) => {

      return (
      <div key={index} className="w-1/3 overflow-hidden">
      {account.qty} {account.name} ${(account.qty * account.price).toLocaleString('en-US', {maximumFractionDigits:2})}
      </div>  );  
    })}


    <GroupTotal 
      accounts={props.accounts}
      name="Tiferet"
      group={1}
    >

    </GroupTotal>

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
