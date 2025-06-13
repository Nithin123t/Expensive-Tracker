// src/components/Summary.jsx
import React from "react";
import "./Summary.css";

const Summary = ({ transactions }) => {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="summary">
      <div className="card income">
        <h3>Income</h3>
        <p>₹ {income}</p>
      </div>
      <div className="card expense">
        <h3>Expenses</h3>
        <p>₹ {expense}</p>
      </div>
      <div className="card balance">
        <h3>Balance</h3>
        <p>₹ {balance}</p>
      </div>
    </div>
  );
};

export default Summary;
