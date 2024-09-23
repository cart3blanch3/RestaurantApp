import React, { useState } from 'react';
import axios from 'axios';
import styles from './EditCategoryModal.module.css';  // Подключение стилей как модуля

const EditCategoryModal = ({ category, onClose, refreshCategories }) => {
  const [name, setName] = useState(category ? category.name : '');
  const [file, setFile] = useState(null);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    let imageUrl = category ? category.imageUrl : '';

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const uploadResponse = await axios.post(
          'http://localhost:5155/api/fileupload/upload-category-image',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (uploadResponse.data && uploadResponse.data.path) {
          imageUrl = uploadResponse.data.path;
        } else {
          throw new Error('Invalid upload response, path not found.');
        }
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        alert('Error uploading image');
        return;
      }
    }

    const data = {
      id: category ? category.id : undefined,
      name,
      imageUrl
    };

    const method = category && category.id ? 'put' : 'post';
    const url = category && category.id
      ? `http://localhost:5155/api/categories/${category.id}`
      : 'http://localhost:5155/api/categories';

    try {
      await axios[method](url, data);
      refreshCategories();
      onClose();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <div className={styles.modalContent}>
          <form onSubmit={handleSave}>
            <label>
              Название:
              <input type="text" value={name} onChange={e => setName(e.target.value)} required />
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

export default EditCategoryModal;
