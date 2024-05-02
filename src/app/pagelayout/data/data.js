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
      "artist": "John Doe Quartet",
      "description": "En kväll med jazzmusik av John Doe Quartet.",
      "date": "2024-05-03T11:30:00.000Z",
      "price": 150,
      "city": "Stockholm",
      "address": "Some street address"
    },
    {
      "id": 2,
      "artist": "Alice Smith Live",
      "description": "Alice Smith uppträder med sin senaste musik.",
      "date": "2024-05-03T16:00:00.000Z",
      "price": 200,
      "city": "New York",
      "address": "123 Broadway"
    },
    {
      "id": 3,
      "artist": "Theatre Performance: Romeo and Juliet",
      "description": "En teaterföreställning av Shakespeares klassiker.",
      "date": "2024-05-03T19:00:00.000Z",
      "price": 250,
      "city": "London",
      "address": "123 Theatre Street"
    },
    {
      "id": 4,
      "artist": "Summer Music Festival",
      "description": "Ett musikfestival med olika genrer och artister.",
      "date": "2024-05-03T21:00:00.000Z",
      "price": 300,
      "city": "Los Angeles",
      "address": "456 Music Avenue"
    },
    {
      "id": 5,
      "artist": "Miriam Bryant",
      "description": "Ett musikfestival med olika genrer och artister.",
      "date": "2024-06-07T16:00:00.000Z",
      "price": 300,
      "city": "Stavanger",
      "address": "Vaulen",
      "spotifyEmbed": "<iframe style='border-radius:12px' src='https://open.spotify.com/embed/artist/2zd9YxlsQvA5mkZ1NarYVQ?utm_source=generator' width='40%' height='152' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture' loading='lazy'></iframe>",
      "spotifyLink": "https://open.spotify.com/artist/2zd9YxlsQvA5mkZ1NarYVQ"
    }
    
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
