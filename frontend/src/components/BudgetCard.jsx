 function BudgetCard({
  category,
  budget,
  spent
}) {

  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  return (
    <div className="budget-card">

      <div className="budget-header">

        <h3>{category}</h3>

        <span>
          ₹{spent} / ₹{budget}
        </span>

      </div>

      <div className="progress">

        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

      <p>
        {percentage.toFixed(0)}% used
      </p>

      {percentage >= 90 && (
        <div className="warning">
          ⚠️ Budget almost exceeded
        </div>
      )}

    </div>
  );
}

export default BudgetCard;