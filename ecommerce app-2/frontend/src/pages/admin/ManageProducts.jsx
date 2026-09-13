import { useEffect, useState } from "react";
import { api } from "../../api/api.js";
import { formatMoney } from "../../utils.js";

const emptyForm = { name: "", description: "", price: "", category: "", imageUrl: "", stock: "" };

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => api.getProducts().then(setProducts);

  useEffect(() => { load(); }, []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    try {
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        await api.createProduct(payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      imageUrl: product.imageUrl || "",
      stock: String(product.stock),
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.deleteProduct(id);
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.2rem" }}>{editingId ? "Edit product" : "Add a product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>Name
            <input required value={form.name} onChange={update("name")} />
          </label>
          <label>Category
            <input required value={form.category} onChange={update("category")} />
          </label>
          <label>Price (INR)
            <input required type="number" min="0" step="0.01" value={form.price} onChange={update("price")} />
          </label>
          <label>Stock
            <input required type="number" min="0" value={form.stock} onChange={update("stock")} />
          </label>
          <label className="full">Image URL
            <input value={form.imageUrl} onChange={update("imageUrl")} placeholder="https://…" />
          </label>
          <label className="full">Description
            <input required value={form.description} onChange={update("description")} />
          </label>
        </div>
        {error && <p className="error-text">{error}</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-primary" type="submit">{editingId ? "Save changes" : "Add product"}</button>
          {editingId && <button type="button" className="btn-outline" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h2 style={{ fontSize: "1.2rem", marginTop: 40 }}>Catalog ({products.length})</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{formatMoney(p.price)}</td>
              <td>{p.stock}</td>
              <td style={{ display: "flex", gap: 8 }}>
                <button className="btn-outline" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
