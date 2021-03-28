import React from 'react';
import {currencyNames} from './currencyNames'

export const CurrencySelector = ({currencyAndValue, addCurrencyToTable}) => {
  const currNames = Object.entries(currencyNames)
  
   const getCurrencyName = (currency) => {
     for(let curr of currNames){
       if(curr[0] === currency) return curr[1]
     }
     return currency
   }
  return (
    <select name="currencies" id="currencies">
      {currencyAndValue.map((item) => (
        <option value={item[0]} onClick={(e) => addCurrencyToTable(e)} key={`${item[0]}:${item[1]}`}>
          {getCurrencyName(item[0])}
        </option>
      ))}
    </select>
  );
};
