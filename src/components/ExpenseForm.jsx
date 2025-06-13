import React, { useState, useEffect } from "react";

const ExpenseForm = ({ addTransaction, editTransaction, clearEdit, disabled }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editTransaction) {
      setDescription(editTransaction.description || "");
      // Ensure amount is always string for controlled input
      setAmount(editTransaction.amount !== undefined && editTransaction.amount !== null ? String(editTransaction.amount) : "");
      setCategory(editTransaction.category || "Food");
      setDate(editTransaction.date || "");
    } else {
      setDescription("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [editTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return; // disable form submit if not logged in

    if (!description || !amount || !date) {
      alert("Please fill all required fields");
      return;
    }

    const newTransaction = {
      id: editTransaction ? editTransaction.id : Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date,
    };

    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Description</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Amount</label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Category</label>
        <select
          className="w-full border rounded p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={disabled}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Salary</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Travel</option>
            <option>Investment</option>

          <option>Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Date</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={disabled}
          className={`px-4 py-2 rounded text-white ${
            disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editTransaction ? "Update" : "Add"}
        </button>
        {editTransaction && (
          <button
            type="button"
            onClick={clearEdit}
            disabled={disabled}
            className={`px-4 py-2 rounded text-white ${
              disabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
