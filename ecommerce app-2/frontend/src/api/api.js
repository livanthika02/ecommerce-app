const BASE_URL = "https://ecommerce-backend-2-kf4m.onrender.com/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const api = {
  // auth
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request("/auth/me"),

  // products
  getProducts: (params = "") => request(`/products${params}`),
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (body) => request("/products", { method: "POST", body: JSON.stringify(body) }),
  updateProduct: (id, body) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: "DELETE" }),

  // orders
  createOrder: (body) => request("/orders", { method: "POST", body: JSON.stringify(body) }),
  getMyOrders: () => request("/orders/my"),
  getAllOrders: () => request("/orders"),
  updateOrderStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};
