import { useEffect, useState } from 'react';
import { CurrencySelector } from './components/CurrencySelector';
import { CurrencyTable } from './components/CurrencyTable';
import { EmptyTable } from './components/EmptyTable';
import { Header } from './components/layout/Header';
function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  useEffect(() => {
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((err) => console.error(err));
  }, []);

  const [currencies, setCurrencies] = useState([]);

  const currencyAndValue = Object.entries(exchangeRates);

  const addCurrencyToTable = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const isExist = currencies.some((i) => i === value);
    if (!isExist) {
      console.log(currencies);
      setCurrencies((prevState) => [...prevState, value]);
      console.log(currencies);
    }
    return;
  };

  const removeFromTable = (e, currency) => {
    const newCurs = currencies.filter((i) => i !== currency);
    setCurrencies(newCurs);
  };
  return (
    <div className="">
      <Header />
      <div className="container-fluid">
        <CurrencySelector
          currencyAndValue={currencyAndValue}
          addCurrencyToTable={addCurrencyToTable}
        />
        <hr />
        {currencies.length >= 1 ? (
          <CurrencyTable
            currencyAndValue={currencyAndValue}
            currencies={currencies}
            removeFromTable={removeFromTable}
          />
        ) : (
          <EmptyTable />
        )}
      </div>
    </div>
  );
}

export default App;
