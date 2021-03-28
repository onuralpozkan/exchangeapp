import { useEffect, useState } from 'react';
function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  useEffect(() => {
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((err) => console.error(err));
  }, []);
  
  const [currencies, setCurrencies] = useState([])
  let curarr = [];
  const [currentRate, setCurrentRate] = useState();
  const arrs = Object.entries(exchangeRates);
  let filtered = [];
  for (let cur of currencies) {
    arrs.filter((i) => {
      if (i[0] === cur) return filtered.push(i);
      return;
    });
  }

  const addCurrencyToTable = (e) => {
    e.preventDefault();
    const {value} = e.target
    console.log(e.target.value)
    const isExist = currencies.some((i) => i == value);
    if (!isExist) {
      console.log(currencies);
      setCurrencies(prevState => [...prevState, value])
      console.log(currencies);
    };
    return;
  };

  const selectCurr = (
    <select name="" id="">
      {arrs.map((i) => (
        <option
          value={i[0]}
          onClick={(e) => addCurrencyToTable(e)}
        >
          {i[0]}
        </option>
      ))}
    </select>
  );

  const noDataText = 'There is No data';
  const currTable = (
    <table className="table table-responsive table-striped">
      <thead>
        <tr>
          {currencies.map((i) => (
            <th>{i} <span className="ml-4"><button className="btn btn-danger text-light" onClick={(e)=>removeFromTable(e,i)}><i className="fas fa-trash"></i></button> </span></th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {filtered.map((i) => (
            <td>{i[1]}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
  const removeFromTable = (e,currency) => {
      console.log(currency);
      console.log(e);
      const newCurs =  currencies.filter(i => i !== currency)
      setCurrencies(newCurs)
  }
  return (
    <div className="App">
      <pre>{JSON.stringify(exchangeRates)}</pre>
      <h1 className="bg-danger p-4">Exchange Rates</h1>

      <h1>To Add Currency</h1>
      {selectCurr}
      <h4>{filtered}</h4>
      {currencies.length >= 1 ? currTable : noDataText}
    </div>
  );
}

export default App;
