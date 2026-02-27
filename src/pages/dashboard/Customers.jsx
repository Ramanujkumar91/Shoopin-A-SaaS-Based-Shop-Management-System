import { useState } from "react";
import { useCustomers } from "../../context/CustomerContext";

function Customers() {
  const { customers, addCustomer } = useCustomers();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !phone) return alert("Fill all fields");

    addCustomer({
      id: Date.now(),
      name,
      phone,
      totalSpent: 0,
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Customers</h2>

      {/* ADD CUSTOMER */}
      <form onSubmit={handleAdd}>
        <input
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button>Add Customer</button>
      </form>

      {/* CUSTOMER LIST */}
      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Total Spent (₹)</th>
            <th>Credit Due (₹)</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5">No customers added</td>
            </tr>
          ) : (
            customers.map((c) => (
              <>
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.totalSpent}</td>
                  <td style={{ color: c.credit > 0 ? "red" : "green" }}>
                    {c.credit}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === c.id ? null : c.id
                        )
                      }
                    >
                      {expandedId === c.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* PURCHASE HISTORY */}
                {expandedId === c.id && (
                  <tr>
                    <td colSpan="5">
                      <strong>Purchase History</strong>
                      {c.purchases.length === 0 ? (
                        <p>No purchases yet</p>
                      ) : (
                        <ul>
                          {c.purchases.map((p) => (
                            <li key={p.id}>
                              {p.date} — ₹{p.total}{" "}
                              {p.isCredit && "(Credit)"}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;