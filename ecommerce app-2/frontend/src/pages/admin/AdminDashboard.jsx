import { useState } from "react";
import ManageProducts from "./ManageProducts.jsx";
import ManageOrders from "./ManageOrders.jsx";

export default function AdminDashboard() {
  const [tab, setTab] = useState("products");

  return (
    <div className="container">
      <h1 style={{ marginTop: 40 }}>Admin dashboard</h1>
      <div className="admin-tabs">
        <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>
          Products
        </button>
        <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>
          Orders
        </button>
      </div>
      {tab === "products" ? <ManageProducts /> : <ManageOrders />}
    </div>
  );
}
