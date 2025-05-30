import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const username = user?.email?.split('@')[0];
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="brand" onClick={() => navigate('/home')}>ShopEasy</h2>
      </div>
      <div className="navbar-right">
        <div className="profile" onClick={toggleDropdown}>
          <FaUserCircle size={24} color="#333" />
          {username && <span className="user-greeting">Hello, {username}!</span>}
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
              {/* You can add more buttons like Profile, Settings here */}
            </div>
          )}
        </div>
        <button className="nav-btn cart-btn" onClick={onCartClick}>
          Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
