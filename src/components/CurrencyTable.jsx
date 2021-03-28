import React,{useState} from 'react';

export const CurrencyTable = ({currencyAndValue, currencies, removeFromTable}) => {
  let filtered = [];
  for (let currency of currencies) {
    currencyAndValue.filter((item) => {
      if (item[0] === currency) return filtered.push(item);
      return;
    });
  }
  return (
    <table className="table table-responsive table-striped">
      <thead>
        <tr>
          {currencies.map((currency) => (
            <th>
              {currency}
              <span className="ml-4">
                <button
                  className="btn btn-danger text-light"
                  onClick={(e) => removeFromTable(e, currency)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {filtered.map((item) => (
            <td>{item[1]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
