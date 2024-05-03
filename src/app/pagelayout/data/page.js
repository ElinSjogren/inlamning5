'use client'

import React, { useEffect, useState } from 'react';
import { openDB } from 'idb';
import styles from './page.module.css';
import { initDatabase } from './data';
import MediaLinks from '../../components/media/page'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import additionalStyles from './../../components/addeventdb/customdatepicker.css';
import { convertEmbedCode } from '@/app/components/addeventdb/functions/convertcode';

function Database() {
  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    artist: '',
    description: '',
    date: '',
    price: '',
    city: '',
    address: '',
    spotifyEmbed: ''
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
      const convertedEmbed = convertEmbedCode(editData.spotifyEmbed);
      setEditData({ ...editData, spotifyEmbed: convertedEmbed });
      
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
        address: '',
        spotifyEmbed:'',
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
  useEffect(() => {
    console.log("Initial Spotify embed value:", editData.spotifyEmbed);
  }, []);
  return (
    <div style={{borderBottom:'5px solid black'}}>
     <div>
      {userData.map((item) => (
      <div key={item.id} style={{ backgroundColor: '#f97316', padding: '20px', borderRadius: '10px', color: 'white', margin:'20px'}}>
      <p><strong>Artist:</strong> {item.artist}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Price:</strong> {item.price}</p>
      <p><strong>City:</strong> {item.city}</p>
      <p><strong>Adress:</strong> {item.address}</p>
      <p><strong>Spotify Embed:</strong><br/></p>
      <div dangerouslySetInnerHTML={{ __html: item.spotifyEmbed }} />
      
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
<DatePicker
  wrapperClassName="datePicker"
  id="date"
  selected={editData.date ? new Date(editData.date) : null} 
  dateFormat="dd/MM/yyyy HH:mm" 
  showTimeSelect 
  timeFormat="HH:mm" 
  minDate={new Date()} 
  popperPlacement="bottom"
  showYearDropdown 
  scrollableMonthYearDropdown 
  onChange={(date) => setEditData({ ...editData, date })} 
  className={styles.inputField} 
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
          />

<p className={styles.pFont}>Spotify Embed:</p>
<textarea
  value={editData.spotifyEmbed}
  className={styles.textareaField}
  onChange={(e) => setEditData({...editData, spotifyEmbed: e.target.value})}
/>
          <br/>
          <button onClick={handleUpdate} className={styles.updateButton}>Update</button>
        </div>
      )}
      <div>
        <button onClick={() => handleEdit(item.id)} className={styles.editButton}>Edit</button>
        <button onClick={() => handleDelete(item.id)} className={styles.deleteButton}>Delete</button>
        <br/><br/><MediaLinks event={item} />
      </div>
     </div>
  ))}
</div>

    </div>
  );
}

export default Database;
