import React from "react";

const ExpenseList = ({ transactions, deleteTransaction, startEditTransaction, disabled }) => {
  if (transactions.length === 0) {
    return (
      <p className="max-w-md mx-auto mt-6 text-center text-gray-600">No transactions yet.</p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center border-b py-2 last:border-none"
          >
            <div>
              <p className="font-semibold">{t.description}</p>
              <p className="text-sm text-gray-600">{t.category} | {t.date}</p>
              <p className={`font-bold ${t.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${t.amount.toFixed(2)}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (!disabled) startEditTransaction(t.id);
                }}
                disabled={disabled}
                className={`px-3 py-1 rounded text-white ${
                  disabled ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (!disabled) deleteTransaction(t.id);
                }}
                disabled={disabled}
                className={`px-3 py-1 rounded text-white ${
                  disabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
