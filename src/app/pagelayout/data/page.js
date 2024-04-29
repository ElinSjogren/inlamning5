'use client'

import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';
import styles from './page.module.css';
import { initDatabase } from './data';

function Database() {
  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    artist: '',
    description: '',
    date: '',
    price: '',
    city: '',
    address: ''
  });

  const fetchLatestData = async () => {
    console.log("Opening IndexedDB...");
    const db = await openDB("test-event", 1);
    const data = await db.getAll("userData");
    console.log("Database initialized");
    setUserData(data);
  };

  useEffect(() => {
    console.log("Database component mounted");
    
    // Anropa initDatabase-funktionen med en callback-funktion som uppdaterar state
    initDatabase((initialData) => {
      setUserData(initialData);
    });
    
    fetchLatestData();
  }, []);

  console.log(userData);

  const handleEdit = (id) => {
    console.log("Editing item with id:", id);
    setEditId(id);
    const editItem = userData.find(item => item.id === id);
    setEditData(editItem);
  };

  const handleUpdate = async () => {
    console.log("Updating item with id:", editId);
    
    try {
      const db = await openDB("test-event", 1);
      
      const tx = db.transaction("userData", "readwrite");
      const store = tx.objectStore("userData");
      
      await store.put(editData);
  
      await tx.done;
  
      const updatedData = userData.map(item => {
        if (item.id === editId) {
          return {
            ...item,
            ...editData
          };
        }
        return item;
      });
      
      setUserData(updatedData);
      setEditId(null);
      setEditData({
        artist: '',
        description: '',
        date: '',
        price: '',
        city: '',
        address: ''
      });
      
      console.log("Item updated successfully.");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting item with id:", id);
    
    try {
      const db = await openDB('test-event', 1, {
        upgrade(db) {
          db.createObjectStore('userData', { keyPath: 'id' });
        },
      });
  
      const tx = db.transaction('userData', 'readwrite');
      const store = tx.objectStore('userData');
      await store.delete(id);
      await tx.done;
  
      const updatedData = userData.filter(item => item.id !== id);
      setUserData(updatedData);
    } catch (error) {
      console.error('Error deleting item from IndexedDB:', error);
    }
  };

  return (
    <div style={{borderBottom:'5px solid black'}}>
     <div>
      {userData.map((item) => (
      <div key={item.id} style={{ backgroundColor: '#f97316', padding: '20px', borderRadius: '10px', color: 'white', margin:'20px'}}>
      {/* <p><strong>id:</strong> {item.id}</p> */}
      <p><strong>Artist:</strong> {item.artist}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Date:</strong> {item.date}</p>
      <p><strong>Price:</strong> {item.price}</p>
      <p><strong>City:</strong> {item.city}</p>
      <p><strong>Adress:</strong> {item.address}</p>
      <hr/>
      {editId === item.id && (
        <div style={{color:'black'}}>
          <p className={styles.pFont}>Artist:</p>
          <input
            type="text"
            value={editData.artist}
            className={styles.inputField}
            onChange={(e) => setEditData({...editData, artist: e.target.value})}
          />
          <p className={styles.pFont}>Description:</p>
          <input
            type="text"
            className={styles.inputField}
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
          />
          <p className={styles.pFont}>Date:</p>
          <input
            type="date"
            className={styles.inputField}
            value={editData.date}
            onChange={(e) => setEditData({...editData, date: e.target.value})}
          />
          <p className={styles.pFont}>Price:</p>
          <input
            type="text"
            className={styles.inputField}
            value={editData.price}
            onChange={(e) => setEditData({...editData, price: e.target.value})}
          />
          <p className={styles.pFont}>City:</p>
          <input
            type="text"
            value={editData.city}
            className={styles.inputField}
            onChange={(e) => setEditData({...editData, city: e.target.value})}
          />
          <p className={styles.pFont}>Address:</p>
          <input
            type="text"
            value={editData.address}
            className={styles.inputField}
            onChange={(e) => setEditData({...editData, address: e.target.value})}
          /><br/>
          <button onClick={handleUpdate} className={styles.updateButton}>Update</button>
        </div>
      )}
      <div>
        <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
        <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
        
      </div>
     </div>
  ))}
</div>

    </div>
  );
}

export default Database;
