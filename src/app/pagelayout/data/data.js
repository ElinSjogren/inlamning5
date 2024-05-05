let isDatabaseInitialized = false;

export function initDatabase(callback) {
  if (isDatabaseInitialized) {
    console.log("Database is already initialized");
    return;
  }

  isDatabaseInitialized = true;

  const idb =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  console.log("Opening IndexedDB...");
  const request = idb.open("test-event", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    console.log("Database upgrade needed");
    const db = request.result;

    if (!db.objectStoreNames.contains("userData")) {
      console.log("Creating userData object store");
      const objectStore = db.createObjectStore("userData", { keyPath: "id" });
    }
  };

  const Event_Data = [
    {
      "id": 1,
      "artist": "Miriam Bryant",
      "description": "Music festival with various artists and genres",
      "date": "2024-06-07T16:00:00.000Z",
      "price": 300,
      "city": "Stavanger",
      "address": "Vaulen",
      "country": "NO",
      "spotifyEmbed": "<iframe style='border-radius:12px'src='https://open.spotify.com/embed/artist/2zd9YxlsQvA5mkZ1NarYVQ?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/24af08cfcaf790d68c372122edf47e18.jpg#24af08cfcaf790d68c372122edf47e18"
    },
    {
      "id": 2,
      "artist": "Atmozfears",
      "description": "Music festival with various artists and genres",
      "date": "2024-05-17T17:00:00.000Z",
      "price": 300,
      "city": "Las Vegas",
      "address": "Las Vegas Motor Speedway,7000 Las Vegas Blvd",
      "country": "US",
      "spotifyEmbed": "<iframe style='border-radius:12px'src='https://open.spotify.com/embed/artist/0MBGxwmCdXdO26ojaNcT64?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/d3ba1662925a497cc955c42aaed31564.jpg#d3ba1662925a497cc955c42aaed31564"
    },
    {
      "id": 3,
      "artist": "Fröken Snusk",
      "description": "Music festival with various artists and genres",
      "date": "2024-08-31T20:00:00.000Z",
      "price": 299,
      "city": "Furuvik",
      "address": "Furuviksparken",
      "country": "SE",
      "spotifyEmbed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/artist/6RjsbK9T7d1UQD1PFEYYGt?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/6b44f0bad3898288c3cfd1b526c25fa7.jpg#6b44f0bad3898288c3cfd1b526c25fa7"
    },
    {
      "id": 4,
      "artist": "Armin Van Buuren (Escapade 2024)",
      "description": "Music festival with various artists and genres",
      "date": "2024-06-23T15:00:00.000Z",
      "price": 700,
      "city": "Ottawa",
      "address": "Lansdowne Park",
      "country": "CA",
      "spotifyEmbed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/artist/0SfsnGyD8FpIN4U4WCkBZ5?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/ac74385a78324f4ab46e39b37295f5aa.jpg#ac74385a78324f4ab46e39b37295f5aa"
    },
    {
      "id": 5,
      "artist": "Aly & Fila",
      "description": "Music festival with various artists and genres",
      "date": "2024-09-05T11:55:00.000Z",
      "price": 450,
      "city": "Ibiza",
      "address": "Eden Park",
      "country": "ES",
      "spotifyEmbed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/artist/2hL1EouqXLtBEB6JKnPF0h?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/b10e8dcd0d3f4178a276859a63ec8bfb.jpg#b10e8dcd0d3f4178a276859a63ec8bfb"
    }
    
  ];

  request.onsuccess = function () {
    console.log("IndexedDB opened successfully");

    const db = request.result;

    const transaction = db.transaction("userData", "readwrite");
    const userData = transaction.objectStore("userData");

    transaction.oncomplete = function() {
      console.log("Data added successfully");
      callback(Event_Data); // Pass Event_Data to the callback function after data is added
      console.log("userData:", userData);
    };

    console.log("Adding items to IndexedDB:");
    Event_Data.forEach((item) => {
      console.log(item);
      userData.add(item);
    });
  };
}
