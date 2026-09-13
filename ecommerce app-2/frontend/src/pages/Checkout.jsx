import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { api } from "../api/api.js";
import { formatMoney } from "../utils.js";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", addressLine: "", city: "", postalCode: "", country: "",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      await api.createOrder({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: form,
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: 40 }}>Checkout</h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="form-grid">
          <label className="full">Full name
            <input required value={form.fullName} onChange={update("fullName")} />
          </label>
          <label className="full">Address
            <input required value={form.addressLine} onChange={update("addressLine")} />
          </label>
          <label>City
            <input required value={form.city} onChange={update("city")} />
          </label>
          <label>Postal code
            <input required value={form.postalCode} onChange={update("postalCode")} />
          </label>
          <label className="full">Country
            <input required value={form.country} onChange={update("country")} />
          </label>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="cart-summary">
          <span>Order total</span>
          <strong>{formatMoney(totalPrice)}</strong>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button className="btn-primary" type="submit" disabled={placing}>
            {placing ? "Placing order…" : "Place order"}
          </button>
        </div>
      </form>
    </div>
  );
}
