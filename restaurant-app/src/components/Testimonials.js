import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="testimonials-section">
      <h2>Отзывы</h2>
      <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false}>
        <div className="testimonial-item">
          <p>"Прекрасное место с великолепной едой. Очень рекомендую!"</p>
          <h3>- Иван Иванов</h3>
        </div>
        <div className="testimonial-item">
          <p>"Отличный сервис и вкусная еда. Вернусь снова!"</p>
          <h3>- Мария Петрова</h3>
        </div>
        <div className="testimonial-item">
          <p>"Настоящий вкус Азии! Всем советую."</p>
          <h3>- Алексей Сидоров</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
