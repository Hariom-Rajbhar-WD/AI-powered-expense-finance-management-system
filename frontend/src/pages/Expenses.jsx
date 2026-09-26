 import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

import API from "../services/api";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

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

  useEffect(() => {
    loadExpenses();
  }, []);

  const addExpense = (expense) => {

    setExpenses((previous) => [
      expense,
      ...previous
    ]);

  };

  const deleteExpense = (id) => {

    setExpenses((previous) =>
      previous.filter(
        (expense) =>
          expense._id !== id
      )
    );

  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="page-content">

          <h1>Expenses</h1>

          <p>
            Add and manage your expenses
          </p>

          <ExpenseForm
            onExpenseAdded={addExpense}
          />

          <ExpenseTable
            expenses={expenses}
            onDelete={deleteExpense}
          />

        </section>

      </main>

    </div>
  );
}

export default Expenses;