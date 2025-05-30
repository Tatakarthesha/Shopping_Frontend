import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/shopping')
      .then(res => res.json())
      .then(data => {
        setProducts(data.shopping);
        setFiltered(data.shopping);
      });

    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(savedCart);
  }, []);

  const handleAddToCart = (product) => {
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
    setSearchQuery(''); // Reset search when changing category
  };

  const showAll = () => {
    setFiltered(products);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const result = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  const goToCartPage = () => navigate('/cart');

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={goToCartPage} /><br />

      <div className="home-container">
        <div className="search-bar-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="search-input"
          />
        </div>

        <div className="category-buttons">
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("Men's Clothing")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("Women's Clothing")}>Women's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("Jewelery")}>Jewelery</button>
          <button className="category-button" onClick={() => filterByCategory("Electronics")}>Electronics</button>
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h4 className="product-title">{product.title}</h4>
              <p className="product-price"><strong>${product.price}</strong></p>
              <p className="product-description">{product.description.slice(0, 60)}...</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
