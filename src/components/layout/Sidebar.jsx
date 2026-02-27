import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { role, logout } = useAuth();

  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2>Shoopin</h2>

      <nav style={{ marginTop: "20px" }}>
        {/* COMMON */}
        <p>
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        </p>

        {/* OWNER ONLY */}
        {role === "OWNER" && (
          <>
            <p>
              <Link to="/dashboard/products" style={linkStyle}>
                Products
              </Link>
            </p>

            <p>
              <Link to="/dashboard/customers" style={linkStyle}>
                Customers
              </Link>
            </p>

            <p>
              <Link to="/dashboard/reports" style={linkStyle}>
                Reports
              </Link>
            </p>

            <p>
              <Link to="/dashboard/pricing" style={linkStyle}>
                Upgrade Plan
              </Link>
            </p>

            <p>
              <Link to="/dashboard/settings" style={linkStyle}>
                Settings
              </Link>
            </p>
          </>
        )}

        {/* OWNER + STAFF */}
        <p>
          <Link to="/dashboard/billing" style={linkStyle}>
            Billing (POS)
          </Link>
        </p>

        <hr style={{ margin: "20px 0", borderColor: "#374151" }} />

        <button onClick={logout} style={logoutStyle}>
          Logout
        </button>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const logoutStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px",
  width: "100%",
  cursor: "pointer",
};

export default Sidebar;