import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  // State for admin login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Product form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  // Hardcoded admin credentials - replace with your own
  const adminUsername = 'admin';
  const adminPassword = 'admin123';

  // Handle admin login submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      setIsLoggedIn(true);
      // Clear login fields
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid admin credentials');
    }
  };

  // Handle product form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rate' || name === 'count') {
      setFormData(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle product form submit
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      id: parseInt(formData.id),
      price: parseFloat(formData.price),
      rating: {
        rate: parseFloat(formData.rating.rate),
        count: parseInt(formData.rating.count)
      }
    };

    try {
      const res = await fetch('http://localhost:4000/api/shopping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (data.success || res.ok) {
        alert('Product created successfully!');
        navigate('/'); // or navigate to wherever you want after product creation
      } else {
        alert('Error creating product.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    }
  };

  // Admin logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="admin-container">
      {!isLoggedIn ? (
        <>
          <h2>Admin Login</h2>
          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login as Admin</button>
          </form>
        </>
      ) : (
        <>
          <button onClick={handleLogout} style={{ marginBottom: '15px' }}>Logout Admin</button>
          <h2>Add New Product</h2>
          <form onSubmit={handleProductSubmit} className="admin-form">
            <input type="number" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
            <input type="number" step="0.1" name="rate" placeholder="Rating Rate" value={formData.rating.rate} onChange={handleChange} required />
            <input type="number" name="count" placeholder="Rating Count" value={formData.rating.count} onChange={handleChange} required />

            <button type="submit">Create Product</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Admin;
