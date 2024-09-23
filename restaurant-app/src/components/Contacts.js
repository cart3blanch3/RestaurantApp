import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import markerIconUrl from '../assets/marker-icon.png'; // Путь к вашей иконке метки
import './Contacts.css'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 55.162625649999995,
  lng: 61.290384619110576,
};

// Иконка метки на карте
const customIcon = new Icon({
  iconUrl: markerIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Contacts = () => {
  return (
    <div className="contacts-section">
      <div className="contacts-left">
        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" style={{ color: '#EE1E32' }} />
          <p>Адрес: ул. Академика Королёва, 33</p>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" style={{ color: '#EE1E32' }} />
          <p>Телефон: +7 (351) 777-60-15</p>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon" style={{ color: '#EE1E32' }} />
          <p>Email: restogong@gmail.com</p>
        </div>
        <div className="contact-item">
          <FaClock className="contact-icon" style={{ color: '#EE1E32' }} />
          <p>Часы работы: с 12:00 до 23:00</p>
        </div>
      </div>
      <div className="contacts-right">
        <MapContainer center={center} zoom={17} style={mapContainerStyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='' // Убрана подпись
          />
          <Marker position={center} icon={customIcon}>
            <Popup>Китайский ресторан GONG</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contacts;
