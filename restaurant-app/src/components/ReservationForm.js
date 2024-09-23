// src/components/ReservationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReservationForm.css'; // Подключаем стили для формы
import Modal from './Modal'; // Импортируем новый компонент

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    people: '',
    date: null,
    time: '',
    additionalInfo: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5155/api/reservation/reserve', formData);

      if (response.status === 200) {
        console.log('Reservation submitted:', formData);
        setShowModal(true);
      } else {
        console.error('Failed to submit reservation');
        alert('Failed to submit reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Error submitting reservation');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Забронировать столик</h2>
        <label>
          Имя:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Номер телефона:
          <InputMask
            mask="+7-(999)-999-99-99"
            value={formData.phone}
            onChange={handleChange}
          >
            {() => <input type="tel" name="phone" placeholder="+7-(___)-___-__-__" required />}
          </InputMask>
        </label>
        <label>
          Количество человек:
          <input type="number" name="people" value={formData.people} onChange={handleChange} required />
        </label>
        <label>
          Дата:
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="мм/дд/гггг"
            className="date-picker"
            required
            calendarClassName="custom-calendar"
          />
        </label>
        <label>
          Время:
          <InputMask
            mask="99:99"
            value={formData.time}
            onChange={handleChange}
          >
            {() => <input type="text" name="time" placeholder="чч:мм" required />}
          </InputMask>
        </label>
        <label>
          Дополнительная информация:
          <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
        </label>
        <button type="submit">Отправить</button>
      </form>
      {showModal && (
        <Modal message="С вами свяжутся в течение 30 минут" onClose={closeModal} />
      )}
    </div>
  );
};

export default ReservationForm;
