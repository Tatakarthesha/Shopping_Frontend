import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    const currentQty = newCart[index].quantity || 1;
    if (currentQty > 1) {
      newCart[index].quantity = currentQty - 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const handleRemove = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty.");
    alert("✅ Order placed successfully!");
    setCart([]);
    localStorage.removeItem('cartItems');
  };

  // Totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.10;
  const discount = subtotal > 100 ? subtotal * 0.05 : 0;
  const grandTotal = subtotal + tax - discount;

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No items in the cart.</p>
      ) : (
        <>
          {cart.map((item, index) => {
            const quantity = item.quantity || 1;
            const itemTotal = item.price * quantity;

            return (
              <div className="cart-item" key={index}>
                <div className="cart-item-left">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-control">
                      <button onClick={() => handleDecrease(index)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => handleIncrease(index)}>+</button>
                    </div>
                    <p className="item-total">Total: ${itemTotal.toFixed(2)}</p>
                  </div>
                </div>
                <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
              </div>
            );
          })}

          <div className="cart-summary">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (10%): ${tax.toFixed(2)}</p>
            {discount > 0 && <p>Discount (5%): -${discount.toFixed(2)}</p>}
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckout}>✅ Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
