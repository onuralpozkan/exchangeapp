import { useEffect, useState } from 'react';
import { CurrencySelector } from './components/CurrencySelector';
import { CurrencyTable } from './components/CurrencyTable';
import { EmptyTable } from './components/EmptyTable';
import { Header } from './components/layout/Header';
function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [base, setBase] = useState("EUR")
  const currencyAndValue = Object.entries(exchangeRates);
  useEffect(() => {
    const url = `https://api.exchangeratesapi.io/latest?base=${base}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((err) => console.error(err));
  }, [base]);



  const addCurrencyToTable = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const isExist = currencies.some((i) => i === value);
    if (!isExist) return setCurrencies((prevState) => [...prevState, value])
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
        <div className="base">
          <label htmlFor="">Baz</label>
          <select name="base" id="base" className="form-control">
            <option value="TRY" onClick={(e)=>setBase(e.target.value)}>TL</option>
            <option value="EUR" onClick={(e)=>setBase(e.target.value)}>Avro</option>
            <option value="USD" onClick={(e)=>setBase(e.target.value)}>Dolar</option>
          </select>
        </div>
        <hr/>
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
