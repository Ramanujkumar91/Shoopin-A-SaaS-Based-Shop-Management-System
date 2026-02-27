import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSubscription } from "../../context/SubscriptionContext";

function Settings() {
  const { role } = useAuth();
  const { plan } = useSubscription();

  const [shopName, setShopName] = useState("Shoopin Store");
  const [address, setAddress] = useState("Begusarai, Bihar");
  const [phone, setPhone] = useState("9876543210");

  const [ownerName, setOwnerName] = useState("Ramanuj Kumar");
  const [email] = useState("owner@shopin.com");

  const handleSave = () => {
    alert("Settings saved (frontend only)");
  };

  const handlePasswordChange = () => {
    alert("Password updated (UI only)");
  };

  if (role !== "OWNER") {
    return <h3>Access Denied</h3>;
  }

  return (
    <div>
      <h2>Settings</h2>

      {/* SHOP SETTINGS */}
      <Section title="Shop Details">
        <Input label="Shop Name" value={shopName} onChange={setShopName} />
        <Input label="Address" value={address} onChange={setAddress} />
        <Input label="Contact Number" value={phone} onChange={setPhone} />
        <button onClick={handleSave}>Save Shop Details</button>
      </Section>

      {/* PROFILE SETTINGS */}
      <Section title="Owner Profile">
        <Input label="Name" value={ownerName} onChange={setOwnerName} />
        <Input label="Email" value={email} disabled />
        <button onClick={handleSave}>Save Profile</button>
      </Section>

      {/* PASSWORD */}
      <Section title="Change Password">
        <Input label="Old Password" type="password" />
        <Input label="New Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <button onClick={handlePasswordChange}>Update Password</button>
      </Section>

      {/* SUBSCRIPTION */}
      <Section title="Subscription Info">
        <p><strong>Current Plan:</strong> {plan}</p>
        <p><strong>Expiry:</strong> 31 Dec 2026</p>
      </Section>
    </div>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

function Section({ title, children }) {
  return (
    <div style={sectionStyle}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", disabled }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <br />
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

/* ===== STYLES ===== */

const sectionStyle = {
  background: "#ffffff",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "12px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "300px",
  padding: "8px",
  marginTop: "4px",
};

export default Settings;