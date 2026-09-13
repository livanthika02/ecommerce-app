import { useEffect, useState } from "react";
import { api } from "../api/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    const qs = params.toString() ? `?${params.toString()}` : "";
    try {
      const data = await api.getProducts(qs);
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container">
      <section className="hero">
        <h1>Good products, delivered to your door.</h1>
        <p>Browse the catalog, add what you like to your cart, and check out in a couple of clicks.</p>
      </section>

      <div className="filters">
        <input
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading products…</p>
      ) : products.length === 0 ? (
        <div className="empty-state">No products match your search yet.</div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
