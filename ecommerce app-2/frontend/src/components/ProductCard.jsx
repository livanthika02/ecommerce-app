import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatMoney } from "../utils.js";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;
    {product.imageUrl ? (
  <img 
    src={product.imageUrl.startsWith('http') ? product.imageUrl : `https://ecommerce-backend-2-kf4m.onrender.com${product.imageUrl}`} 
    alt={product.name} 
  />
) : "No image"}
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-thumb">
        {product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : "No image"}
      </div>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <span className="product-stock">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </span>
        <span className="product-price">{formatMoney(product.price)}</span>
        <button
          className="btn-primary"
          style={{ marginTop: 8 }}
          disabled={product.stock === 0}
          onClick={handleQuickAdd}
        >
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </Link>
  );
}
