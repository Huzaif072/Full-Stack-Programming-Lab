import { useState } from "react";
import "./Products.css";

const PRODUCTS = [
  { id: 1, title: "Wireless Headphones", description: "Premium noise-cancelling headphones with 30hr battery life.", price: "Rs. 8,500" },
  { id: 2, title: "Smart Watch", description: "Track your fitness, notifications, and more from your wrist.", price: "Rs. 12,000" },
  { id: 3, title: "Mechanical Keyboard", description: "RGB backlit mechanical keyboard with tactile switches.", price: "Rs. 6,200" },
  { id: 4, title: "Portable Speaker", description: "Waterproof Bluetooth speaker with 360° surround sound.", price: "Rs. 4,800" },
  { id: 5, title: "Laptop Stand", description: "Adjustable aluminium stand for ergonomic laptop use.", price: "Rs. 2,500" },
  { id: 6, title: "USB-C Hub", description: "7-in-1 USB-C hub with HDMI, USB 3.0, and card reader.", price: "Rs. 3,100" },
];

function Products() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart([...cart, product]);
  }

  function isInCart(id) {
    return cart.some((item) => item.id === id);
  }

  return (
    <div className="products-page">
      <div className="page-hero">
        <h1>Our Products</h1>
        <p>Discover our hand-picked collection of premium tech products.</p>
      </div>

      <div className="page-body">
        {cart.length > 0 && (
          <div className="cart-banner">
            🛒 <strong>{cart.length} item{cart.length > 1 ? "s" : ""}</strong> in your cart
          </div>
        )}

        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-emoji">{product.emoji}</div>
              <h3>{product.title}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <button
                  className={`cart-btn ${isInCart(product.id) ? "in-cart" : ""}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={isInCart(product.id)}
                >
                  {isInCart(product.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
