import React from 'react';
import './MenuItemDetailsModal.css';
import { useCart } from '../context/CartContext'; // Importing CartContext

const MenuItemDetailsModal = ({ item, onClose }) => {
  const { cartItems, addToCartHandler, removeFromCartHandler } = useCart(); // Using CartContext

  const getCartItemQuantity = (itemId) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="modal-content">
          <img src={`http://localhost:5155${item.imageUrl}`} alt={item.name} className="item-image" />
          <h2>{item.name}</h2>
          <p className="item-description">{item.description}</p>
          <p className="item-price">{item.price} ₽</p>
          {getCartItemQuantity(item.id) > 0 ? (
            <div className="quantity-controls">
              <button onClick={() => removeFromCartHandler(item.id)}>-</button>
              <span>{getCartItemQuantity(item.id)}</span>
              <button onClick={() => addToCartHandler(item)}>+</button>
            </div>
          ) : (
            <button className="add-to-cart-button" onClick={() => addToCartHandler(item)}>В корзину</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailsModal;
