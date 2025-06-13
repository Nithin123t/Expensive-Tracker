import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Chart from "../components/Chart";
import Header from "../components/Header";

const Home = ({ onLogout, user }) => {
  const isLoggedIn = Boolean(user);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(`transactions_${user?.email}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify(transactions));
    }
  }, [transactions, user?.email]);

  // Calculate total income, total expenses, and remaining amount
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const remaining = totalIncome - totalExpenses;

  const addTransaction = (transaction) => {
    if (editTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === transaction.id ? transaction : t))
      );
      setEditTransaction(null);
    } else {
      setTransactions([transaction, ...transactions]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    if (editTransaction && editTransaction.id === id) {
      setEditTransaction(null);
    }
  };

  const startEditTransaction = (id) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    setEditTransaction(transactionToEdit);
  };

  const clearEdit = () => {
    setEditTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header user={user} onLogout={onLogout} />

      {/* Summary Boxes */}
      <div className="max-w-md mx-auto flex justify-between mb-6 space-x-4">
        <div className="flex-1 bg-white rounded shadow p-4 text-center">
          <h2 className="text-gray-600 font-semibold">Total Income</h2>
          <p className="text-green-600 text-2xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="flex-1 bg-white rounded shadow p-4 text-center">
          <h2 className="text-gray-600 font-semibold">Total Expenses</h2>
          <p className="text-red-600 text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="flex-1 bg-white rounded shadow p-4 text-center">
          <h2 className="text-gray-600 font-semibold">Remaining</h2>
          <p
            className={`text-2xl font-bold ${
              remaining >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${remaining.toFixed(2)}
          </p>
        </div>
      </div>

      <ExpenseForm
        addTransaction={isLoggedIn ? addTransaction : () => {}}
        editTransaction={editTransaction}
        clearEdit={clearEdit}
        disabled={!isLoggedIn}
      />

      <ExpenseList
        transactions={transactions}
        deleteTransaction={isLoggedIn ? deleteTransaction : () => {}}
        startEditTransaction={isLoggedIn ? startEditTransaction : () => {}}
        disabled={!isLoggedIn}
      />

      <div className="max-w-md mx-auto mt-10">
        <Chart transactions={transactions} />
      </div>

      {!isLoggedIn && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-yellow-100 text-yellow-900 rounded text-center font-semibold">
          Please login to activate buttons and interact with the app.
        </div>
      )}
    </div>
  );
};

export default Home;
