import { useEffect, useState } from 'react';
import { CurrencySelector } from './components/CurrencySelector';
import { CurrencyTable } from './components/CurrencyTable';
import { EmptyTable } from './components/EmptyTable';
import { Header } from './components/layout/Header';
function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [base, setBase] = useState("USD")
  const [currencyAndValue,setCurrencyAndValues] = useState([])
  useEffect(() => {
    //const API_URL = "http://data.fixer.io/api/latest?access_key=8d8d4813bdd326237b70832be8999a07&base="
    const API_URL = "http://api.openrates.io/latest"
    fetch(`${API_URL}?base=${base}`)
    .then((res) => res.json())
    .then((data) =>{
      setExchangeRates(data.rates)
      setCurrencyAndValues(Object.entries(exchangeRates))
      console.log(data.rates);
    })
    .catch((err) => console.error(err));
  }, [base,exchangeRates]);
 

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
        <i>{base} = 1</i> 
        <hr/>
        <CurrencySelector
          currencyAndValue={currencyAndValue}
          addCurrencyToTable={addCurrencyToTable}
          base={base}
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
