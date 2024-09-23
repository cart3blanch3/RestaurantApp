import React, { useState } from 'react';
import Modal from 'react-modal';
import './HeroSection.css';
import ReservationForm from './ReservationForm';

Modal.setAppElement('#root'); // Set the root element for accessibility

const HeroSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Добро пожаловать в наш ресторан</h1>
        <p>У нас самые вкусные блюда и лучшая атмосфера.</p>
        <button className="hero-button" onClick={openModal}>Забронировать</button>
      </div>
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        contentLabel="Reservation Form"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-button" onClick={closeModal}>X</button>
        <ReservationForm />
      </Modal>
    </section>
  );
};

export default HeroSection;
