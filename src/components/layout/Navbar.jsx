import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3>Dashboard</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;