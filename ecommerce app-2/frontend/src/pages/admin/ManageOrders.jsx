import { useEffect, useState } from "react";
import { api } from "../../api/api.js";
import { formatMoney } from "../../utils.js";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => api.getAllOrders().then(setOrders);

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateOrderStatus(id, status);
    load();
  };

  if (orders.length === 0) {
    return <div className="empty-state">No orders placed yet.</div>;
  }

  return (
    <table>
      <thead>
        <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Placed</th></tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id}>
            <td>#{order._id.slice(-6)}</td>
            <td>{order.user?.name || "—"}</td>
            <td>{formatMoney(order.totalAmount)}</td>
            <td>
              <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
