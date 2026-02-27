import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OWNER");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    login("fake-jwt-token", role);
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Illustration */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
          alt="Login"
          className="login-image"
        />

        <h2>USER LOGIN</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role selector (for your requirement) */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="OWNER">Owner</option>
            <option value="STAFF">Staff</option>
          </select>

          <button type="submit">LOGIN</button>
        </form>

        <p className="footer-text">© Shoopin SaaS</p>
      </div>
    </div>
  );
}

export default Login;