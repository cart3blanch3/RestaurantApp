import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Cart.css';
import cartIcon from '../assets/cart-icon.png';
import InputMask from 'react-input-mask';
import Modal from './Modal'; // Импортируем компонент Modal

const Cart = () => {
  const { cartItems, totalItems, addToCartHandler, removeFromCartHandler } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false); // Состояние для модального окна заказа
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryMethod: 'delivery',
    additionalInfo: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleDecreaseQuantity = (itemId) => {
    removeFromCartHandler(itemId);
  };

  const handleIncreaseQuantity = (itemId) => {
    const item = cartItems.find(item => item.id === itemId);
    addToCartHandler(item);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value
    });
  };

  const handleDeliveryMethodChange = (method) => {
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: method
    });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      ...orderDetails,
      items: cartItems
    };

    try {
      const response = await axios.post('http://localhost:5155/api/order/place-order', orderData);

      if (response.status === 200) {
        console.log('Order details:', orderData);
        openOrderModal(); // Открываем модальное окно после успешного заказа
      } else {
        console.error('Failed to submit order', response);
      }
    } catch (error) {
      console.error('Error submitting order:', error.response || error.message);
    }
  };

  return (
    <>
      <div className="cart-icon-container" onClick={openModal}>
        <div className="cart-icon">
          <img src={cartIcon} alt="Cart" />
        </div>
        {totalItems > 0 && (
          <div className="cart-count">
            {totalItems}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2>Корзина</h2>
            {cartItems.length > 0 ? (
              <>
                <table>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.price.toFixed(2)} руб.</td>
                        <td>
                          <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="total-price">Итого: {calculateTotalPrice()} руб.</p>
                <form className="order-form" onSubmit={handleSubmitOrder}>
                  <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={orderDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Телефон:
                      <InputMask
                        mask="+7-(999)-999-99-99"
                        value={orderDetails.phone}
                        onChange={handleInputChange}
                      >
                        {() => <input type="tel" name="phone" placeholder="+7-(___)-___-__-__" required />}
                      </InputMask>
                    </label>
                  </div>
                  <div className="form-group">
                    <div className="delivery-options">
                      <div className="radio-label">
                        <input
                          type="radio"
                          id="delivery"
                          name="deliveryMethod"
                          value="delivery"
                          checked={orderDetails.deliveryMethod === 'delivery'}
                          onChange={() => handleDeliveryMethodChange('delivery')}
                        />
                        <label htmlFor="delivery">Доставка</label>
                      </div>
                      <div className="radio-label">
                        <input
                          type="radio"
                          id="pickup"
                          name="deliveryMethod"
                          value="pickup"
                          checked={orderDetails.deliveryMethod === 'pickup'}
                          onChange={() => handleDeliveryMethodChange('pickup')}
                        />
                        <label htmlFor="pickup">Самовывоз</label>
                      </div>
                    </div>
                  </div>
                  {orderDetails.deliveryMethod === 'delivery' ? (
                    <div className="form-group">
                      <label htmlFor="address">Адрес:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={orderDetails.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ) : (
                    <p>ул. Академика Королёва, 33</p>
                  )}
                  <div className="form-group">
                    <label htmlFor="additionalInfo">Комментарий:</label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={orderDetails.additionalInfo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="submit-order-button">Оформить заказ</button>
                </form>
              </>
            ) : (
              <p>Ваша корзина пуста</p>
            )}
          </div>
        </div>
      )}
      {isOrderModalOpen && (
        <Modal message="С вами свяжутся в течение 30 минут" onClose={closeOrderModal} />
      )}
    </>
  );
};

export default Cart;
