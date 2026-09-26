 import { useState } from "react";
import API from "../services/api";

function ExpenseForm({ onExpenseAdded }) {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/expenses",
        form
      );

      onExpenseAdded(response.data);

      setForm({
        title: "",
        amount: "",
        category: "Food",
        description: "",
        date: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to add expense"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="expense-form"
      onSubmit={submitHandler}
    >

      <input
        name="title"
        placeholder="Expense title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
      >

        <option>Food</option>
        <option>Rent</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Education</option>
        <option>Entertainment</option>
        <option>Health</option>
        <option>Other</option>

      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>

    </form>
  );
}

export default ExpenseForm;