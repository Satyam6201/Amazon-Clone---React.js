import React, { useEffect, useState } from 'react';
import './Cart.css';
import Navbar from '../components/Navbar';
import NavbarList from '../components/NavbarList';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(true);
  const { updateCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let fetchedProducts = [];

      for (const item of cart) {
        try {
          let res = await fetch(`https://dummyjson.com/products/${item.id}`);
          const data = await res.json();
          fetchedProducts.push({ ...data, quantity: item.quantity, selected: true });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }

      setCartItems(fetchedProducts);
      setLoading(false);
    };

    fetchCartData();
  }, []);

  const updateCart = (cartData) => {
    const cartToStore = cartData.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem('cart', JSON.stringify(cartToStore));
    setCartItems(cartData);
    updateCartCount();
  };

  const handleQuantityChange = (itemId, action) => {
    let updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const item = updatedCart[itemIndex];
      if (action === 'increment') {
        item.quantity += 1;
      } else if (action === 'decrement') {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          updatedCart = updatedCart.filter((i) => i.id !== itemId);
        }
      }
      updateCart(updatedCart);
    }
  };

  const handleDeleteItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    updateCartCount();
  };

  const handleSelectAllToggle = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: newState })));
  };

  const handleItemCheckbox = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedCart);
    setSelectAll(updatedCart.every((item) => item.selected));
  };

  const calculateSubtotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity * 6, 0)
      .toFixed(2);
  };
  
  return (
    <div className="fullpage">
      <Navbar />
      <NavbarList />
      <div className="cart">
        <div className="cartData">
          <h1>Shopping Cart</h1>
          <div className="row">
            <span className="link" onClick={handleSelectAllToggle}>
              {selectAll ? 'Deselect All' : 'Select All'}
            </span>
            <span className="t2">Price</span>
          </div>
          <div className="hr"></div>
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cartItem" key={item.id}>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleItemCheckbox(item.id)}
                />
                <div className="cartItemrow">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="details">
                    <h2>{item.title}</h2>
                    <span className="stock">
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="normal">
                      Sold by <span className="link">Amazon Seller</span>
                    </span>
                    
                    <span className="normal">
                      Delivery by {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    
                    <span className="priceBlock">
                      <span className="originalPrice">Rs. {(item.price / (1 - item.discountPercentage / 100) * 6).toFixed(2)}</span>
                      <span className="finalPrice">Rs. {(item.price * item.quantity*6).toFixed(2)}</span>
                    </span>

                    <span className="incrementdecrement">
                      {item.quantity > 1 ? (
                        <span onClick={() => handleQuantityChange(item.id, 'decrement')}>-</span>
                      ) : (
                        <span onClick={() => handleDeleteItem(item.id)}>
                          <RiDeleteBin6Line />
                        </span>
                      )}
                      <span>{item.quantity}</span>
                      <span onClick={() => handleQuantityChange(item.id, 'increment')}>+</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <button className="clearCartBtn" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </div>

        <div className="cartTotal">
          <h1>Subtotal ({cartItems.filter((item) => item.selected).length} items):</h1>
          <span>Rs. {calculateSubtotal()}</span>
          <button onClick={() => navigate('/checkout')}>Proceed to Buy</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
