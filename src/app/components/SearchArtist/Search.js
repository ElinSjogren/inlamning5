import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import styles from './search.module.css';

const Search = () => {
  const [resultEvents, setResultEvents] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [allEvents, setAllEvents] = useState([]);

  const fetchLatestData = async () => {
    const db = await openDB("test-event", 1);
    const data = await db.getAll("userData");
    setAllEvents(data);
  };

  const searchAfterInput = (artist) => {
    if (artist === "") {
      setResultEvents([]);
      setInputVal(artist);
    } else {
      setInputVal(artist);
      const regex = new RegExp(artist, 'i');
      const result = allEvents.filter(event => regex.test(event.artist));
      setResultEvents(result);
    }
  };
  

  useEffect(() => {
    console.log("Database component mounted");
    fetchLatestData();
  }, []);

  useEffect(() => {
    searchAfterInput(inputVal);
  }, [inputVal, allEvents]);

  return (
    <div className={styles.searchResultWrapper}>
      <input style={{ color: "black" }}
        type="text"
        placeholder="Search Artist..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <div className={styles.searchResult}>
        <ul>
        Result:
          {resultEvents.map((event, index) => (
            <li key={index}>{event.artist}
        <ul>
                <li>{new Date(event.date).toString()}</li>
                <li>{event.city}</li>
                <li>{event.country}</li>
                <hr/>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
