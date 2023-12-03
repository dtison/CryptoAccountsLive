import React, { /* useState, useContext, useEffect */ } from 'react';

const GroupTotal = props => {

  return (

    <div className="w-1/3 overflow-hidden">
    {props.name} ${
    props.accounts.filter(e=>e.group === props.group).reduce((acc,curr) => {
      return acc + (curr.qty * curr.price);
    }, 0).toLocaleString('en-US', {maximumFractionDigits:2})
    }
    </div>
  )
}
export default GroupTotal;