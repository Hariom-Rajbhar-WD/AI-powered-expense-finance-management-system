 import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Charts from "../components/Charts";

import API from "../services/api";

function Dashboard() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    const loadExpenses = async () => {

      try {

        const response = await API.get(
          "/expenses"
        );

        setExpenses(response.data);

      } catch (error) {

        console.error(error);

      }
    };

    loadExpenses();

  }, []);

  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (expense) =>
              Number(expense.amount)
          )
        )
      : 0;

  const categories = new Set(
    expenses.map(
      (expense) => expense.category
    )
  ).size;

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="page-content">

          <div className="page-title">

            <div>
              <h1>Dashboard</h1>

              <p>
                Track and understand your spending
              </p>
            </div>

          </div>

          <div className="stats-grid">

            <div className="stat-card">
              <span>Total Expenses</span>
              <strong>
                ₹{totalExpense.toFixed(2)}
              </strong>
            </div>

            <div className="stat-card">
              <span>Transactions</span>
              <strong>
                {expenses.length}
              </strong>
            </div>

            <div className="stat-card">
              <span>Categories</span>
              <strong>
                {categories}
              </strong>
            </div>

            <div className="stat-card">
              <span>Highest Expense</span>
              <strong>
                ₹{highestExpense.toFixed(2)}
              </strong>
            </div>

          </div>

          <Charts
            expenses={expenses}
          />

        </section>

      </main>

    </div>
  );
}

export default Dashboard;