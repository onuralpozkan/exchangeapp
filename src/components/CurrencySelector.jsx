import React from 'react';
import {currencyNames} from './currencyNames'

export const CurrencySelector = ({currencyAndValue, addCurrencyToTable, base}) => {
  const currNames = Object.entries(currencyNames)
  const currenciesWithoutBase = currencyAndValue.filter(i => i[0] !== base)
   const getCurrencyName = (currency) => {
     for(let curr of currNames){
       if(curr[0] === currency) return curr[1]
     }
     return currency
   }
  return (
   <>
   <label htmlFor="currencies">Döviz Kuru</label>
    <select name="currencies" id="currencies" className="form-control">
      {currenciesWithoutBase.map((item) => (
        <option value={item[0]} onClick={(e) => addCurrencyToTable(e)} key={`${item[0]}:${item[1]}`}>
          {getCurrencyName(item[0])}
        </option>
      ))}
    </select>
   </>
  );
};
