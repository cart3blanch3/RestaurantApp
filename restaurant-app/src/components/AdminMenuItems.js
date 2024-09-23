import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminMenuItems.css';
import MenuItemForm from './MenuItemForm'; 

const AdminMenuItems = () => {
    const { categoryId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        fetchMenuItems();
    }, [categoryId]);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get(`http://localhost:5155/api/menuitems/category/${categoryId}`);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Ошибка при получении элементов меню:', error);
        }
    };

    const handleDeleteMenuItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5155/api/menuitems/${itemId}`);
            fetchMenuItems(); 
        } catch (error) {
            console.error('Ошибка при удалении элемента меню:', error);
        }
    };

    const openForm = (item = null) => {
        setCurrentItem(item);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setCurrentItem(null);
        fetchMenuItems();
    };

    return (
        <div className="admin-menu-items">
            <h2>Позиции категории</h2>
            <button onClick={() => openForm()}>Добавить позицию</button>
            <div className="items-list">
                {menuItems.map(item => (
                    <div key={item.id} className="menu-item">
                        <img src={`http://localhost:5155${item.imageUrl}`} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.price} ₽</p>
                        <button onClick={() => openForm(item)}>Редактировать</button>
                        <button onClick={() => handleDeleteMenuItem(item.id)}>Удалить</button>
                    </div>
                ))}
            </div>
            {isFormOpen && (
                <MenuItemForm
                    item={currentItem}
                    onClose={closeForm}
                    categoryId={categoryId}
                    refreshItems={fetchMenuItems} 
                />
            )}
        </div>
    );
};

export default AdminMenuItems;
