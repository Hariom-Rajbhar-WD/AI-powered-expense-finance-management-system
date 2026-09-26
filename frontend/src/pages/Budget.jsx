 import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BudgetCard from "../components/BudgetCard";

import API from "../services/api";

function Budget() {

  const [budgets, setBudgets] = useState([]);

  const [form, setForm] = useState({
    category: "Food",
    amount: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  useEffect(() => {

    loadBudgets();

  }, []);

  const loadBudgets = async () => {

    try {

      const response = await API.get(
        "/budgets"
      );

      setBudgets(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const createBudget = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/budgets",
        form
      );

      setBudgets((previous) => [
        response.data,
        ...previous
      ]);

      setForm({
        ...form,
        amount: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create budget"
      );

    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="page-content">

          <h1>Budget</h1>

          <p>
            Set your monthly spending limits
          </p>

          <form
            className="budget-form"
            onSubmit={createBudget}
          >

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value
                })
              }
            >

              <option>Food</option>
              <option>Rent</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>Health</option>

            </select>

            <input
              type="number"
              placeholder="Budget amount"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value
                })
              }
              required
            />

            <button type="submit">
              Create Budget
            </button>

          </form>

          <div className="budget-grid">

            {budgets.map((budget) => (

              <BudgetCard
                key={budget._id}
                category={budget.category}
                budget={budget.amount}
                spent={0}
              />

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Budget;