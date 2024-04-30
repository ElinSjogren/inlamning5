'use client'
import React, { useState } from 'react';
import styles from '../../pagelayout/data/page.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddEvent({ onAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    artist: '',
    description: '',
    date: '',
    price: '',
    city: '',
    address: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    const dbPromise = indexedDB.open("test-event", 1); // Öppna databasen

    const { artist, description, date, price, city, address } = newEvent;

    if (artist && description && price && city && address) {
      dbPromise.onsuccess = (event) => {
        const db = event.target.result;
        const tx = db.transaction("userData", "readwrite");
        const userData = tx.objectStore("userData");

        const getRequest = userData.getAllKeys();
        getRequest.onsuccess = (event) => {
          const keys = event.target.result;
          const maxId = Math.max(...keys, 0); // Find the maximum ID
          const newId = maxId + 1;
          sessionStorage.setItem("LatestEvent", `${artist}  having an event the ${date}`);
          const addEventRequest = userData.add({
            id: newId,
            artist: artist,
            description: description,
            date: date,
            price: price,
            city: city,
            address: address
          });

          addEventRequest.onsuccess = () => {
            tx.oncomplete = () => {
              db.close();
            };
            alert("Event added successfully!");
            setNewEvent({
              artist: '',
              description: '',
              date: '',
              price: '',
              city: '',
              address: ''
            });
          };

          addEventRequest.onerror = () => {
            alert("Error adding event to the database");
          };
        };
      };

      dbPromise.onerror = () => {
        console.error("Error opening database");
      };
    } else {
      alert('Please fill in all fields before adding a new event.');
    }
  };

  const handleDateChange = (date) => {
    // Formatera det valda datumet till ISO 8601-format utan tidsinformation
    const formattedDate = date.toISOString().split('T')[0];
    // Uppdatera newEvent-objektet med det formaterade datumet
    setNewEvent({ ...newEvent, date: formattedDate });
  };
  
  return (
    <div style={{ backgroundColor: '#f97316', padding: '20px', borderRadius: '10px', color: 'white', margin:'20px'}}>

      <h1 className={styles.h1Font}>Add New Event</h1>
      <label htmlFor="artist" className={styles.pFont}>Artist:</label><br />
      <input
        type="text"
        id="artist"
        name="artist"
        value={newEvent.artist}
        className={styles.inputField}
        onChange={handleInputChange}
      /><br />
      <label htmlFor="description" className={styles.pFont}>Description:</label><br />
      <input
        type="text"
        id="description"
        name="description"
        value={newEvent.description}
        className={styles.inputField}
        onChange={handleInputChange}
      /><br />
<label htmlFor="date" className={styles.pFont}>Date:</label><br />
<DatePicker
  id="date"
  selected={newEvent.date ? new Date(newEvent.date) : null} // Använd null om newEvent.date är tomt
  onChange={handleDateChange}
  className={styles.inputField}
/>



<br />


      <label htmlFor="price" className={styles.pFont}>Price:</label><br />
      <input
        type="text"
        id="price"
        name="price"
        value={newEvent.price}
        className={styles.inputField}
        onChange={handleInputChange}
      /><br />
      <label htmlFor="city" className={styles.pFont}>City:</label><br />
      <input
        type="text"
        id="city"
        name="city"
        value={newEvent.city}
        className={styles.inputField}
        onChange={handleInputChange}
      /><br />
      <label htmlFor="address" className={styles.pFont}>Address:</label><br />
      <input
        type="text"
        id="address"
        name="address"
        value={newEvent.address}
        className={styles.inputField}
        onChange={handleInputChange}
      /><br />
      <br />
      <button onClick={handleAddEvent} className={styles.addEventButton}>Add Event</button>
    </div>
  );
}

export default AddEvent;
