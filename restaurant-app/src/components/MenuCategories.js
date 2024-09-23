import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuCategories.css';

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5155/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <div className="menu-categories">
      <h2>Меню</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card" onClick={() => handleCategoryClick(category.id)}>
            <img 
              src={`http://localhost:5155${category.imageUrl}`}
              alt={category.name} 
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCategories;
