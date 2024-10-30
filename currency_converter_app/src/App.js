import "./App.css";
import CurrencyInput from "./components/CurrencyInput/CurrencyInput";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [firstCoin, setFirstCoin] = useState(1);
  const [secondCoin, setSecondCoin] = useState(1);

  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  const [rates, setRates] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setRates(response.data.rates);
      })
      .catch((error) => {
        console.error("Erro ao buscar taxas de câmbio: ", error);
        setRates({});
      });
  }, []);

  function format(number) {
    return number.toFixed(2);
  }

  const handleAmountChange = useCallback(
    (firstCoin) => {
      if (rates) {
        setSecondCoin(
          format((firstCoin * rates[currency2]) / rates[currency1])
        );
        setFirstCoin(firstCoin);
      }
    },
    [rates, currency1, currency2]
  );

  useEffect(() => {
    if (rates) {
      handleAmountChange(firstCoin);
    }
  }, [rates, firstCoin, handleAmountChange]);

  function handleCurrencyChange(currency1) {
    if (rates[currency1]) { // Verifica se a moeda digitada é válida
      setSecondCoin(format((firstCoin * rates[currency2]) / rates[currency1]));
      setCurrency1(currency1);
    }
  }

  function handleAmount2Change(secondCoin) {
    if (rates) {
      setFirstCoin(format((secondCoin * rates[currency1]) / rates[currency2]));
      setSecondCoin(secondCoin);
    }
  }

  function handleCurrency2Change(currency2) {
    if (rates[currency2]) { // Verifica se a moeda digitada é válida
      setFirstCoin(format((secondCoin * rates[currency1]) / rates[currency2]));
      setCurrency2(currency2);
    }
  }

  if (!rates) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Conversor de Moedas</h1>

        <CurrencyInput
          onAmountChange={handleAmountChange}
          onCurrencyChange={handleCurrencyChange}
          currencies={Object.keys(rates)}
          amount={firstCoin}
          currency={currency1}
        />

        <CurrencyInput
          onAmountChange={handleAmount2Change}
          onCurrencyChange={handleCurrency2Change}
          currencies={Object.keys(rates)}
          amount={secondCoin}
          currency={currency2}
        />
      </div>
    </div>
  );
}

export default App;
