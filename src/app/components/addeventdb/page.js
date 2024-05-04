'use client'
import React, { useState } from 'react';
import styles from '../../pagelayout/data/page.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import additionalStyles from './customdatepicker.css';
import { convertEmbedCode } from './functions/convertcode';
import CountryDropdown from './functions/countries';

function AddEvent({ onAddEvent }) {
  const [newEvent, setNewEvent] = useState({
    artist: '',
    description: '',
    date: '',
    price: '',
    city: '',
    address: '',
    country: '',
    spotifyEmbed: '',
    imageURL: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'spotifyEmbed') {
      const convertedEmbed = convertEmbedCode(value); 
      setNewEvent({ ...newEvent, [name]: convertedEmbed }); 
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleExampleClick = () => {
    const exampleEmbed = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/EXEMPLE_ID?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    setNewEvent({ ...newEvent, spotifyEmbed: exampleEmbed });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date: date });
  };

  const handleExampleImageClick = () => {
    const exampleImageURL = 'https://lastfm.freetls.fastly.net/i/u/770x0/5ff3a1f68a7144a6abcd1038673a03ed.jpg#5ff3a1f68a7144a6abcd1038673a03ed';
    setNewEvent({ ...newEvent, imageURL: exampleImageURL });
  };
  
  const handleAddEvent = () => {
    const dbPromise = indexedDB.open("test-event", 1); 

    const { artist, description, date, price, city, address, country,spotifyEmbed, imageURL} = newEvent;

    const convertedEmbed = convertEmbedCode(spotifyEmbed);

    if (artist && description && city && address && country) {
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
          console.log("Image URL before adding event:", imageURL);
          
          const addEventRequest = userData.add({
            id: newId,
            artist: artist,
            description: description,
            date: date,
            price: price,
            city: city,
            address: address,
            country: country,
            spotifyEmbed: convertedEmbed,
            imageURL: imageURL,
            
          });

          console.log("Image URL before adding event:", newEvent.imageURL);

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
              country: '',
              spotifyEmbed:'',
              imageURL:'',
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

  return (
    <div style={{ backgroundColor: '#f97316', padding: '20px', borderRadius: '10px', color: 'white', margin:'20px'}} aria-labelledby="addEventHeading">

      <h1 id="addEventHeading" className={styles.h1Font}>Add New Event</h1>
      <label htmlFor="artist" className={styles.pFont}>Artist:</label><br />
      <input
        type="text"
        id="artist"
        name="artist"
        value={newEvent.artist}
        className={styles.inputField}
        onChange={handleInputChange}
        aria-label="Artist"
      /><br />
      <label htmlFor="imageURL" className={styles.pFont}>Image URL: (https://www.last.fm (only img url allowed))</label><br />
      <input 
        type="text" 
        id="imageURL" 
        name="imageURL" 
        value={newEvent.imageURL} 
        className={styles.inputField}
        onChange={handleInputChange}
        aria-label="Image URL"
      /><br/>
      <button onClick={handleExampleImageClick} className={styles.addEventButton}>Example Image-URL</button><br/>
      <label htmlFor="description" className={styles.pFont}>Description:</label><br />
      <input
        type="text"
        id="description"
        name="description"
        value={newEvent.description}
        className={styles.inputField}
        onChange={handleInputChange}
        aria-label="Description"
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
          className={styles.inputField} 
          onChange={handleDateChange}
          aria-label="Date"
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
        aria-label="Price"
      /><br />
      <label htmlFor="city" className={styles.pFont}>City:</label><br />
      <input
        type="text"
        id="city"
        name="city"
        value={newEvent.city}
        className={styles.inputField}
        onChange={handleInputChange}
        aria-label="City"
      /><br />
      <label htmlFor="address" className={styles.pFont}>Address:</label><br />
      <input
        type="text"
        id="address"
        name="address"
        value={newEvent.address}
        className={styles.inputField}
        onChange={handleInputChange}
        aria-label="Address"
      /><br />
      <label htmlFor="country" className={styles.pFont}>Country:</label><br />
      <CountryDropdown
        value={newEvent.country}
        onChange={(e) => handleInputChange({ target: { name: 'country', value: e.target.value } })}
        aria-label="Country"
      /><br/>
      <label htmlFor="spotifyEmbed" className={styles.pFont}>Spotify Embed:</label><br />
      <textarea
        id="spotifyEmbed"
        name="spotifyEmbed"
        value={newEvent.spotifyEmbed}
        className={styles.textareaField}
        onChange={handleInputChange}
        aria-label="Spotify Embed"
      /><br />
      <button onClick={handleExampleClick} className={styles.addEventButton}>Example Code</button>
      <br />
      <br />
      <button onClick={handleAddEvent} className={styles.addEventButton}>Add Event</button>
    </div>
  );
}

export default AddEvent;
