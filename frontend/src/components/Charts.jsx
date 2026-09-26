 import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Charts({ expenses }) {

  const categoryTotals = {};

  expenses.forEach((expense) => {

    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] +=
      Number(expense.amount);

  });

  const data = Object.entries(
    categoryTotals
  ).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="chart-card">

      <h3>Expenses by Category</h3>

      {data.length === 0 ? (

        <p>No data available</p>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={`hsl(${index * 45}, 70%, 55%)`}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}

export default Charts;