import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import EditCategoryModal from './EditCategoryModal';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:5155/api/categories');
    setCategories(response.data);
  };

  const handleDeleteCategory = async (id) => {
    await axios.delete(`http://localhost:5155/api/categories/${id}`);
    fetchCategories();
  };

  const openEditModal = (category) => {
    setEditingCategory(category || { name: '', imageUrl: '' }); // Пустой объект для новой категории
  };

  const closeEditModal = () => {
    setEditingCategory(null);
    fetchCategories();
  };

  const handleViewItems = (categoryId) => {
    navigate(`/admin-panel/categories/${categoryId}/items`);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <button className="add-category-button" onClick={() => openEditModal(null)}>Добавить категорию</button>
      <div className="items-grid">
        {categories.map(category => (
          <div key={category.id} className="item-card" onClick={() => handleViewItems(category.id)}>
            <img src={`http://localhost:5155${category.imageUrl}`} alt={category.name} />
            <h3>{category.name}</h3>
            <button onClick={(e) => { e.stopPropagation(); openEditModal(category); }}>Редактировать</button>
            <button onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}>Удалить</button>
          </div>
        ))}
      </div>
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={closeEditModal}
          refreshCategories={fetchCategories}
        />
      )}
    </div>
  );
};

export default AdminPanel;
