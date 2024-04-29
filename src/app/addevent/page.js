
"use client"
import React, { useState } from "react";
import { openDB } from 'idb';
import styles from './addevent.module.css';



async function createDatabase() {
  const edb = await openDB('theEventsDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('commingEvents')) {
        db.createObjectStore('commingEvents', { keyPath: 'id', autoIncrement: true });
      }
    },
  });

  return edb;
}

export default function AddEvent() {
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  async function addThisNewEvent() {
    const db = await createDatabase();
    await db.add("commingEvents", { artist, description, date });
    const allEvents = await db.getAll("commingEvents");
    console.log(allEvents);
  }

  return (
    <>
      <h2>Lets add some event</h2>
      Artist:
      <input value={artist} type="text" onChange={(event) => setArtist(event.target.value)} className={styles.input}></input>
      Description:
      <input value={description} type="text" onChange={(event) => setDescription(event.target.value)} className={styles.input}></input>
      Date:
      <input value={date} type="date" onChange={(event) => setDate(event.target.value)} className={styles.input}></input>
      <button onClick={addThisNewEvent}>Add</button>
    </>
  );
}
