import React, { useState, useEffect } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, item, onSave }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (item) {
            setName(item.name);
            setImageUrl(item.imageUrl || '');
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...item,
            name,
            imageUrl
        });
        onClose();
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{item.id ? 'Edit Category' : 'Add Category'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <label>Image URL:</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    <button type="submit">{item.id ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
