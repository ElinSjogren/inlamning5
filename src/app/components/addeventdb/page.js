'use client'
import React, { useState } from 'react';
import styles from '../../pagelayout/data/page.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import additionalStyles from './customdatepicker.css';
import { convertEmbedCode } from './functions/convertcode';

function AddEvent({ onAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    artist: '',
    description: '',
    date: '',
    price: '',
    city: '',
    address: '',
    spotifyEmbed: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    const dbPromise = indexedDB.open("test-event", 1); // Öppna databasen

    const { artist, description, date, price, city, address, spotifyEmbed, spotifyLink } = newEvent;

    const convertedEmbed = convertEmbedCode(spotifyEmbed);

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
            address: address,
            spotifyEmbed: convertedEmbed,
            
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
              address: '',
              spotifyEmbed:'',
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
    // Hämta den aktuella tidzonens offset (i minuter)
    const localTimezoneOffset = date.getTimezoneOffset();

    // Lägg till den aktuella tidzonens offset till det lokala datumet
    const localDateWithOffset = new Date(date.getTime() + (localTimezoneOffset * 60000));

    // Konvertera det justerade datumet till ISO-format
    const formattedDate = localDateWithOffset.toISOString();

    // Uppdatera newEvent med det formaterade datumet
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
<div className="form-group">
<DatePicker
  wrapperClassName="datePicker" 
  id="date"
  selected={newEvent.date ? new Date(newEvent.date) : null}
  dateFormat="dd/MM/yyyy HH:mm"
  showTimeSelect
  timeFormat="HH:mm"
  minDate={new Date()}
  popperPlacement="bottom"
  showYearDropdown
  scrollableMonthYearDropdown
  onChange={handleDateChange}
  className={styles.inputField}
/>
</div>
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
      <label htmlFor="spotifyEmbed" className={styles.pFont}>Spotify Embed:</label><br />
      <textarea
        id="spotifyEmbed"
        name="spotifyEmbed"
        value={newEvent.spotifyEmbed}
        className={styles.textareaField}
        onChange={handleInputChange}
      /><br />
      <br />
      <br />
      <button onClick={handleAddEvent} className={styles.addEventButton}>Add Event</button>
    </div>
  );
}

export default AddEvent;
