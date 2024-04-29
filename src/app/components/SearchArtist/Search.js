import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import styles from './search.module.css'
const Search = () => {
  let data=[];
const fetchLatestData = async () => {
  const db = await openDB("test-event", 1);
  data = await db.getAll("userData");
  setEventData(data);
};
function searchAfterInput(artist){
  if(artist==""){
    setresultData([]);
    setInputVal(artist);
  }
  else {
  setInputVal(artist);
  let result = allEvents.filter(event => event.artist.toLowerCase().includes(artist.toLowerCase()));
  setresultData(result);
  }
}

useEffect(() => {
  console.log("Database component mounted");
  fetchLatestData();
}, []);
  const [resultEvents, setresultData] = useState([]);
  const [allEvents, setEventData] = useState(data);
  const [inputVal, setInputVal] = useState('');
  return (
    <div className={styles.searchResultWrapper}>
      <input style={{color:"black"}}
        type="text"
        placeholder="Search Artist..."
        value={inputVal}
        onChange={(e) => searchAfterInput(e.target.value)}
      />
      <div className={styles.searchResult}>
        <ul>
          Result:
          {resultEvents.map((event, index) => (
            <li key={index}>{event.artist}
              <ul>
                <li>{event.date}</li>
                <li>{event.city}</li>
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