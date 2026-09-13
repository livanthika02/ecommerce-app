import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatMoney } from "../utils.js";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 12 }}>
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: 40 }}>Your cart</h1>
      <div>
        {items.map((item) => (
          <div className="cart-row" key={item.productId}>
            <img src={item.imageUrl || ""} alt={item.name} style={{ background: "#eceae2" }} />
            <div>
              <strong>{item.name}</strong>
              <div className="product-stock">{formatMoney(item.price)} each</div>
            </div>
            <input
              type="number"
              min={1}
              max={item.stock}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
              style={{ width: 60, padding: 8, border: "1px solid var(--line)", borderRadius: 3, textAlign: "center" }}
            />
            <strong>{formatMoney(item.price * item.quantity)}</strong>
            <button className="btn-danger" onClick={() => removeFromCart(item.productId)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <span>Total</span>
        <strong>{formatMoney(totalPrice)}</strong>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "flex-end" }}>
        <button className="btn-outline" onClick={() => navigate("/")}>Keep shopping</button>
        <button className="btn-primary" onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
}
