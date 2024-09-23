import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MenuItemForm.module.css'; // Импорт CSS модуля

const MenuItemForm = ({ item, onClose, categoryId, refreshItems }) => {
    const [name, setName] = useState(item ? item.name : '');
    const [description, setDescription] = useState(item ? item.description : '');
    const [price, setPrice] = useState(item ? item.price.toString() : '');
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : '');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setDescription(item.description);
            setPrice(item.price.toString());
            setImageUrl(item.imageUrl);
        }
    }, [item]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let finalImageUrl = imageUrl;

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const uploadResponse = await axios.post(
                    'http://localhost:5155/api/fileupload/upload-dish-image',
                    formData,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                finalImageUrl = uploadResponse.data.Path; // Убедитесь, что используете правильный ключ в ответе API
            } catch (uploadError) {
                console.error('Ошибка загрузки изображения:', uploadError);
                alert('Ошибка загрузки изображения');
                return;
            }
        }

        const menuItemData = {
            id: item ? item.id : undefined,
            name,
            description,
            price: parseFloat(price), 
            imageUrl: finalImageUrl,
            categoryId
        };

        try {
            const response = item ? await axios.put(`http://localhost:5155/api/menuitems/${item.id}`, menuItemData) :
                                    await axios.post('http://localhost:5155/api/menuitems', menuItemData);
            refreshItems();
            onClose();
        } catch (error) {
            console.error('Не удалось сохранить позицию меню:', error);
            alert('Не удалось сохранить позицию меню.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>
                <div className={styles.modalContent}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label>
                            Название:
                            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label>
                            Описание:
                            <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        </label>
                        <label>
                            Цена:
                            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                        </label>
                        <label>
                            Изображение:
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Сохранить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MenuItemForm;
