import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartService, removeFromCart as removeFromCartService, getTotalItems } from '../services/CartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());
  const [totalItems, setTotalItems] = useState(getTotalItems());

  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(getCart());
      setTotalItems(getTotalItems());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCartHandler = (item) => {
    const updatedCart = addToCartService(item);
    setCartItems(updatedCart);
    setTotalItems(getTotalItems());
  };

  const removeFromCartHandler = (itemId) => {
    const updatedCart = removeFromCartService(itemId);
    setCartItems(updatedCart);
    setTotalItems(getTotalItems());
  };

  return (
    <CartContext.Provider value={{ cartItems, totalItems, addToCartHandler, removeFromCartHandler }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
