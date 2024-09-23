import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CategoryItems.css';
import MenuItemDetailsModal from './MenuItemDetailsModal';

const CategoryItems = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartItems, addToCartHandler, removeFromCartHandler } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5155/api/menuitems/category/${id}`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching menu items:', error));
  }, [id]);

  const openDetailsModal = (item) => {
    setSelectedItem(item);
  };

  const closeDetailsModal = () => {
    setSelectedItem(null);
  };

  const getCartItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="category-items">
      <h2>Блюда категории</h2>
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card" onClick={() => openDetailsModal(item)}>
            <img 
              src={`http://localhost:5155${item.imageUrl}`}
              alt={item.name} 
            />
            <h3>{item.name}</h3>
            <p className="item-price">{item.price} ₽</p>
            {getCartItemQuantity(item.id) > 0 ? (
              <div className="quantity-controls">
                <button onClick={(e) => { e.stopPropagation(); removeFromCartHandler(item.id); }}>-</button>
                <span>{getCartItemQuantity(item.id)}</span>
                <button onClick={(e) => { e.stopPropagation(); addToCartHandler(item); }}>+</button>
              </div>
            ) : (
              <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); addToCartHandler(item); }}>
                В корзину
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedItem && (
        <MenuItemDetailsModal item={selectedItem} onClose={closeDetailsModal} />
      )}
    </div>
  );
}

export default CategoryItems;
