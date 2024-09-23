import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GONG</Link>
      </div>
      <nav className="nav">
        <span className="nav-link" onClick={() => scrollToSection('menu')}>Меню</span>
        <span className="nav-link" onClick={() => scrollToSection('about')}>О нас</span>
        <span className="nav-link" onClick={() => scrollToSection('contact')}>Контакты</span>
      </nav>
    </header>
  );
};

export default Header;
