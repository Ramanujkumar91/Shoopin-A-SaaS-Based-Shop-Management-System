import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useSubscription } from "../../context/SubscriptionContext";

function Products() {
  /* ================= CONFIG ================= */
  const LOW_STOCK_LIMIT = 5;

  // TEMP subscription (later from backend)
  const { plan: subscriptionPlan } = useSubscription();

  const PLAN_LIMITS = {
    BASIC: 5,
    PRO: 20,
    PREMIUM: Infinity,
  };

  const categories = ["Rice", "Sugar", "Oil", "Snacks", "Other"];

  /* ================= CONTEXT ================= */
  const { products, setProducts } = useProducts();

  /* ================= STATE ================= */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [editId, setEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("ALL");

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategory(categories[0]);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      alert("All fields are required");
      return;
    }

    // Subscription limit check (only on ADD)
    if (!editId && products.length >= PLAN_LIMITS[subscriptionPlan]) {
      alert(
        `Product limit reached for ${subscriptionPlan} plan. Please upgrade.`
      );
      return;
    }

    if (editId) {
      setProducts(
        products.map((p) =>
          p.id === editId
            ? { ...p, name, price: Number(price), stock: Number(stock), category }
            : p
        )
      );
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name,
          price: Number(price),
          stock: Number(stock),
          category,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setStock(p.stock);
    setCategory(p.category);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts =
    filterCategory === "ALL"
      ? products
      : products.filter((p) => p.category === filterCategory);

  return (
    <div>
      <h2>Product Management</h2>

      <p>
        <strong>Plan:</strong> {subscriptionPlan} |{" "}
        <strong>Limit:</strong>{" "}
        {PLAN_LIMITS[subscriptionPlan] === Infinity
          ? "Unlimited"
          : PLAN_LIMITS[subscriptionPlan]}
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={
            !editId &&
            products.length >= PLAN_LIMITS[subscriptionPlan]
          }
        >
          {editId ? "Update" : "Add"}
        </button>

        {editId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="ALL">All</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Table */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr
              key={p.id}
              style={{
                background:
                  p.stock <= LOW_STOCK_LIMIT ? "#fee2e2" : "transparent",
              }}
            >
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>
                {p.stock}
                {p.stock <= LOW_STOCK_LIMIT && (
                  <span style={{ color: "red" }}> ⚠ Low</span>
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;