import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useCustomers } from "../../context/CustomerContext";
import { useInvoices } from "../../context/InvoiceContext";
import jsPDF from "jspdf";

function Billing() {
  const { products, setProducts } = useProducts();
  const { customers, addPurchase } = useCustomers();
  const { addInvoice } = useInvoices();

  const GST_RATE = 0.05;

  const [cart, setCart] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [isCreditSale, setIsCreditSale] = useState(false);

  /* ================= CART LOGIC ================= */

  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      if (existing.qty >= product.stock) {
        alert("Not enough stock");
        return;
      }
      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      if (product.stock <= 0) {
        alert("Out of stock");
        return;
      }
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  /* ================= CALCULATIONS ================= */

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  /* ================= PDF INVOICE ================= */

  const generatePDFInvoice = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Shoopin - Invoice", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice ID: ${invoice.id}`, 14, 30);
    doc.text(`Date: ${invoice.date}`, 14, 36);

    const customer = customers.find((c) => c.id === selectedCustomerId);
    if (customer) {
      doc.text(`Customer: ${customer.name}`, 14, 42);
      doc.text(`Phone: ${customer.phone}`, 14, 48);
    }

    let y = 60;
    doc.text("Product", 14, y);
    doc.text("Qty", 90, y);
    doc.text("Price", 120, y);
    doc.text("Total", 160, y);

    y += 5;
    doc.line(14, y, 195, y);
    y += 8;

    cart.forEach((item) => {
      doc.text(item.name, 14, y);
      doc.text(String(item.qty), 90, y);
      doc.text(`₹${item.price}`, 120, y);
      doc.text(`₹${item.price * item.qty}`, 160, y);
      y += 8;
    });

    y += 5;
    doc.line(14, y, 195, y);
    y += 10;

    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 140, y);
    y += 7;
    doc.text(`GST (5%): ₹${gst.toFixed(2)}`, 140, y);
    y += 7;
    doc.setFontSize(13);
    doc.text(`Grand Total: ₹${total.toFixed(2)}`, 140, y);

    if (invoice.isCredit) {
      y += 10;
      doc.setFontSize(11);
      doc.text("Payment Mode: CREDIT", 14, y);
    }

    doc.save(`${invoice.id}.pdf`);
  };

  /* ================= BILL GENERATION ================= */

  const generateBill = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        const sold = cart.find((c) => c.id === p.id);
        return sold ? { ...p, stock: p.stock - sold.qty } : p;
      })
    );

    const invoice = {
      id: "INV-" + Date.now(),
      date: new Date().toLocaleString(),
      total: total.toFixed(2),
      isCredit: isCreditSale,
    };

    // Save invoice
    addInvoice(invoice);

    // Link invoice to customer
    if (selectedCustomerId) {
      addPurchase(selectedCustomerId, invoice);
    }

    generatePDFInvoice(invoice);

    // Reset
    setCart([]);
    setSelectedCustomerId("");
    setIsCreditSale(false);
  };

  /* ================= UI ================= */

  return (
    <div>
      <h2>Billing / POS</h2>

      {/* CUSTOMER SELECTION */}
      <div style={{ marginBottom: "15px" }}>
        <label>Select Customer: </label>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        >
          <option value="">Walk-in Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.phone})
            </option>
          ))}
        </select>

        {selectedCustomerId && (
          <label style={{ marginLeft: "15px" }}>
            <input
              type="checkbox"
              checked={isCreditSale}
              onChange={(e) => setIsCreditSale(e.target.checked)}
            />
            Credit Sale
          </label>
        )}
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {/* PRODUCTS */}
        <div style={{ width: "50%" }}>
          <h3>Products</h3>
          {products.map((p) => (
            <div key={p.id}>
              {p.name} (₹{p.price}) | Stock: {p.stock}
              <button onClick={() => addToCart(p)} style={{ marginLeft: "10px" }}>
                Add
              </button>
            </div>
          ))}
        </div>

        {/* CART */}
        <div style={{ width: "50%" }}>
          <h3>Cart</h3>

          {cart.map((i) => (
            <div key={i.id}>
              {i.name}
              <button onClick={() => updateQty(i.id, i.qty - 1)}>-</button>
              {i.qty}
              <button onClick={() => updateQty(i.id, i.qty + 1)}>+</button>
            </div>
          ))}

          <hr />
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>GST (5%): ₹{gst.toFixed(2)}</p>
          <h3>Total: ₹{total.toFixed(2)}</h3>

          <button onClick={generateBill}>Generate Invoice (PDF)</button>
        </div>
      </div>
    </div>
  );
}

export default Billing;