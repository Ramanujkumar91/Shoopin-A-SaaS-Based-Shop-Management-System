import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterShop() {
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!shopName || !ownerName || !email || !password) {
      alert("All fields are required");
      return;
    }

    // TEMP: simulate successful registration
    alert("Shop registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2>Register Your Shop</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button type="submit">Register Shop</button>
      </form>
    </div>
  );
}

export default RegisterShop;