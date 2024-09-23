import React from 'react';
import { FaVk } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';
import flampIconUrl from '../assets/flamp-icon.svg'; // Путь к вашей иконке Flamp
import './Footer.css'; // Подключаем CSS стили для Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-line"></div>
        <div className="footer-items">
          <div className="footer-text">
            <p>Все права защищены © 2024</p>
            <p><a href="/privacy-policy">Политика конфиденциальности</a></p>
          </div>
          <div className="footer-icons">
            <a href="https://vk.com/gongrest74" target="_blank" rel="noopener noreferrer">
              <FaVk className="social-icon" />
            </a>
            <a href="https://www.tripadvisor.ru/Restaurant_Review-g298539-d13115306-Reviews-Gong-Chelyabinsk_Chelyabinsk_Oblast_Urals_District.html" target="_blank" rel="noopener noreferrer">
              <SiTripadvisor className="social-icon" />
            </a>
            <a href="https://chelyabinsk.flamp.ru/firm/gong_kitajjskijj_restoran-70000001028498018" target="_blank" rel="noopener noreferrer" className="flamp-icon-link">
              <img src={flampIconUrl} alt="Flamp" className="social-icon flamp-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
