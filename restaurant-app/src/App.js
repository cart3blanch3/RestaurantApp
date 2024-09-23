import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MenuCategories from './components/MenuCategories';
import CategoryItems from './components/CategoryItems';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import AdminMenuItems from './components/AdminMenuItems'; // Импортируем новый компонент для страницы элементов меню

// Компонент для защищенного маршрута
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <section id="menu">
                  <MenuCategories />
                </section>
                <section id="about">
                  <AboutUs />
                </section>
                <Testimonials />
                <section id="contact">
                  <Contacts />
                </section>
                <Footer />
              </>
            } />
            <Route path="/categories/:id" element={<CategoryItems />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin-panel" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            <Route path="/admin-panel/categories/:categoryId/items" element={
              <ProtectedRoute>
                <AdminMenuItems />
              </ProtectedRoute>
            } />
          </Routes>
          <Cart />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
