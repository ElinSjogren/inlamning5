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
      "description": "Ett musikfestival med olika genrer och artister.",
      "date": "2024-06-07T16:00:00.000Z",
      "price": 300,
      "city": "Stavanger",
      "address": "Vaulen",
      "country": "NO",
      "spotifyEmbed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/artist/2zd9YxlsQvA5mkZ1NarYVQ?utm_source=generator' width='40%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/24af08cfcaf790d68c372122edf47e18.jpg#24af08cfcaf790d68c372122edf47e18"
    },
    {
      "id": 2,
      "artist": "Atmozfears",
      "description": "Ett musikfestival med olika genrer och artister.",
      "date": "2024-05-17T17:00:00.000Z",
      "price": 300,
      "city": "Las Vegas",
      "address": "Las Vegas Motor Speedway,7000 Las Vegas Blvd",
      "country": "US",
      "spotifyEmbed": "<iframe style='border-radius:12px'src='https://open.spotify.com/embed/artist/0MBGxwmCdXdO26ojaNcT64?utm_source=generator' width='100%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "imageURL": "https://lastfm.freetls.fastly.net/i/u/770x0/d3ba1662925a497cc955c42aaed31564.jpg#d3ba1662925a497cc955c42aaed31564"
    },
    
  ];

  sessionStorage.setItem("LatestEvent", "Event: Summer music festival in Los Angeles");

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
