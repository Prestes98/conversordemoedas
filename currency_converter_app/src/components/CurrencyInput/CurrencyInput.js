import React from "react";
import "./currencyInput.css";

const CurrencyInput = ({
  amount, // valor atual da moeda
  currency, // código da moeda selecionada no input
  onAmountChange,
  onCurrencyChange,
  currencies,
}) => {
  const handleCurrencyInputChange = (e) => {
    const newCurrency = e.target.value.toUpperCase();
    if (currencies.includes(newCurrency)) {
      onCurrencyChange(newCurrency); // Atualiza o estado apenas se a moeda é válida
    }
  };

  return (
    <div className="container-input">
      <input
        type="number"
        value={isNaN(amount) ? '' : amount}
        onChange={(e) => onAmountChange(parseFloat(e.target.value))}
      />

      <input
        type="text"
        list="currency-options"
        defaultValue={currency} // Permite digitação e seleção de valor padrão
        onChange={handleCurrencyInputChange}
      />

      <datalist id="currency-options">
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default CurrencyInput;
