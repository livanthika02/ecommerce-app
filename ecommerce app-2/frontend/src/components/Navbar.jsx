import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">ShopEasy</Link>
        <nav className="nav-links">
          <Link to="/">Shop</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user && <Link to="/orders">My orders</Link>}
          <Link to="/cart" className="cart-pill">
            Cart{totalItems > 0 ? ` · ${totalItems}` : ""}
          </Link>
          {user ? (
            <button className="nav-btn" onClick={() => { logout(); navigate("/"); }}>
              Log out
            </button>
          ) : (
            <Link to="/login" className="nav-btn">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
