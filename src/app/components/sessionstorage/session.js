import { openDB } from 'idb';

export async function setLatestEventToSession() {
    console.log("Opening IndexedDB...");
    const db = await openDB("test-event", 1);
    const data = await db.getAll("userData");
    console.log("Database initialized");
  
    const latestEvent = data.reduce((prev, current) => {
      return prev.id > current.id ? prev : current;
    });
    
    const eventDate = new Date(latestEvent.date);
    const formattedDate = eventDate.toLocaleDateString();

 sessionStorage.setItem("LatestEvent", `${latestEvent.artist} in ${latestEvent.city} ${formattedDate}`);}
