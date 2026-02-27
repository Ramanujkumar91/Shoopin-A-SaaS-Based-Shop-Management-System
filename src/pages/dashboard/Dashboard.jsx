import { useProducts } from "../../context/ProductContext";
import { useSubscription } from "../../context/SubscriptionContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { products } = useProducts();
  const { plan } = useSubscription();
  const { role } = useAuth();
  const navigate = useNavigate();

  const todaysSales = 4520;

  const weeklySales = [
    { day: "Mon", sales: 1200 },
    { day: "Tue", sales: 1800 },
    { day: "Wed", sales: 900 },
    { day: "Thu", sales: 2000 },
    { day: "Fri", sales: 2600 },
    { day: "Sat", sales: 3200 },
    { day: "Sun", sales: 2200 },
  ];

  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* QUICK ACTIONS */}
      <div style={actionsWrapper}>
        {role === "OWNER" && (
          <>
            <button style={actionBtn} onClick={() => navigate("/dashboard/products")}>
              ➕ Add Product
            </button>

            <button style={actionBtn} onClick={() => navigate("/dashboard/reports")}>
              📊 View Reports
            </button>
          </>
        )}

        <button
          style={{ ...actionBtn, background: "#22c55e" }}
          onClick={() => navigate("/dashboard/billing")}
        >
          🧾 New Bill
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div style={gridStyle}>
        <div style={{ ...cardStyle, borderLeft: "6px solid #22c55e" }}>
          <h3>₹ {todaysSales}</h3>
          <p>Today's Sales</p>
        </div>

        {role === "OWNER" && (
          <>
            <div style={{ ...cardStyle, borderLeft: "6px solid #3b82f6" }}>
              <h3>{products.length}</h3>
              <p>Total Products</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #ef4444" }}>
              <h3>{lowStockCount}</h3>
              <p>Low Stock Items</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #a855f7" }}>
              <h3>{plan}</h3>
              <p>Subscription Plan</p>
            </div>
          </>
        )}
      </div>

      {/* SALES CHART */}
      <div style={chartCard}>
        <h3>Weekly Sales Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklySales}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const actionsWrapper = {
  display: "flex",
  gap: "12px",
  margin: "20px 0",
  flexWrap: "wrap",
};

const actionBtn = {
  padding: "10px 16px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const chartCard = {
  marginTop: "40px",
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

export default Dashboard;