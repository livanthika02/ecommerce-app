import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api.js";
import { useCart } from "../context/CartContext.jsx";
import { formatMoney } from "../utils.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <div className="container"><p>Loading…</p></div>;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container">
      <div className="detail-grid">
        <div className="detail-image">
          {product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : "No image"}
        </div>
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-price">{formatMoney(product.price)}</div>
          <p>{product.description}</p>
          <p className="product-stock">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <div className="qty-row">
            <input
              type="number"
              min={1}
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            />
            <button className="btn-primary" disabled={product.stock === 0} onClick={handleAdd}>
              {added ? "Added ✓" : "Add to cart"}
            </button>
            <button className="btn-outline" onClick={() => navigate("/")}>Back to shop</button>
          </div>
        </div>
      </div>
    </div>
  );
}
