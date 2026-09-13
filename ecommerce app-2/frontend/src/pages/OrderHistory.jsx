import { useEffect, useState } from "react";
import { api } from "../api/api.js";
import { formatMoney } from "../utils.js";

export default function OrderHistory() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.getMyOrders().then(setOrders);
  }, []);

  if (!orders) return <div className="container"><p>Loading…</p></div>;

  if (orders.length === 0) {
    return <div className="container"><div className="empty-state">You haven't placed any orders yet.</div></div>;
  }

  return (
    <div className="container">
      <h1 style={{ marginTop: 40 }}>Your orders</h1>
      {orders.map((order) => (
        <div key={order._id} style={{ border: "1px solid var(--line)", borderRadius: 3, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span>Order #{order._id.slice(-6)}</span>
            <span className="status-badge">{order.status}</span>
          </div>
          <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} × {item.quantity} — {formatMoney(item.price * item.quantity)}</li>
            ))}
          </ul>
          <strong>Total: {formatMoney(order.totalAmount)}</strong>
          <p className="product-stock" style={{ marginTop: 6 }}>
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
