 import { Trash2 } from "lucide-react";

import API from "../services/api";

function ExpenseTable({
  expenses,
  onDelete
}) {

  const deleteExpense = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this expense?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/expenses/${id}`);

      onDelete(id);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  return (
    <div className="table-container">

      <table>

        <thead>

          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {expenses.length === 0 ? (

            <tr>
              <td colSpan="5">
                No expenses found
              </td>
            </tr>

          ) : (

            expenses.map((expense) => (

              <tr key={expense._id}>

                <td>{expense.title}</td>

                <td>
                  <span className="category">
                    {expense.category}
                  </span>
                </td>

                <td>
                  ₹{Number(expense.amount).toFixed(2)}
                </td>

                <td>
                  {new Date(
                    expense.date
                  ).toLocaleDateString()}
                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteExpense(expense._id)
                    }
                  >
                    <Trash2 size={17} />
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;