import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  // Dummy analytics data (backend later)
  const dailySales = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 2100 },
    { day: "Wed", sales: 800 },
    { day: "Thu", sales: 1600 },
    { day: "Fri", sales: 2500 },
    { day: "Sat", sales: 3000 },
    { day: "Sun", sales: 1800 },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 26000 },
  ];

  const topProducts = [
    { name: "Rice", sold: 120 },
    { name: "Sugar", sold: 90 },
    { name: "Oil", sold: 70 },
    { name: "Snacks", sold: 40 },
  ];

  return (
    <div>
      <h2>Reports & Analytics</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>₹1,12,000<br />Total Revenue</div>
        <div style={cardStyle}>340<br />Total Orders</div>
        <div style={cardStyle}>1,250<br />Products Sold</div>
      </div>

      {/* Daily Sales */}
      <h3>Daily Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dailySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#2563eb" />
        </LineChart>
      </ResponsiveContainer>

      {/* Monthly Revenue */}
      <h3 style={{ marginTop: "40px" }}>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>

      {/* Top Products */}
      <h3 style={{ marginTop: "40px" }}>Top Selling Products</h3>
      <table border="1" cellPadding="10" width="50%">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
          </tr>
        </thead>
        <tbody>
          {topProducts.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cardStyle = {
  flex: 1,
  padding: "20px",
  background: "#f1f5f9",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "bold",
};

export default Reports;