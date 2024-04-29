// import { EventCard } from "../pagelayout/eventcard/page"
// import eventsData from "."
// import { openDB } from 'idb';
// import React, { useState, useEffect } from "react";

// async function createDatabase() {
//   const edb = await openDB('theEventsDB', 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains('commingEvents')) {
//         db.createObjectStore('commingEvents', { keyPath: 'id', autoIncrement: true });
//       }
//     },
//   });

//   return edb;
// }
// function YourComponent() {
//   const [dataArray, setDataArray] = useState([]);

//   useEffect(() => {
//     fetchDataFromIndexedDB();
//   }, []);

//   async function fetchDataFromIndexedDB() {
//     const db = await createDatabase('yourDatabaseName', 1);
//     const tx = db.transaction('yourObjectStoreName', 'readonly');
//     const store = tx.objectStore('yourObjectStoreName');
//     const data = await store.getAll();
//     setDataArray(data);
//   }
// }

// export default function Event({}){
//   return(
//     <>
//     {eventInfo.forEach((event)=>(
//       <EventCard  event={event}/>

//     ))}
//     </>
//   )
// }
export default function Event({}){
  return(
    <>
    event
    </>
  )
}