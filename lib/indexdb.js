// "use client"
const DB_NAME = "messagedb";
const DB_VERSION = 1;
const STORE_NAME = "messages";

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      // If the store is missing (e.g., older DB created without it), upgrade DB to create it
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const newVersion = db.version + 1;
        db.close();
        const upgradeReq = indexedDB.open(DB_NAME, newVersion);
        upgradeReq.onupgradeneeded = (e) => {
          const upgradedDB = e.target.result;
          if (!upgradedDB.objectStoreNames.contains(STORE_NAME)) {
            upgradedDB.createObjectStore(STORE_NAME, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        };
        upgradeReq.onsuccess = () => resolve(upgradeReq.result);
        upgradeReq.onerror = () => reject(upgradeReq.error);
      } else {
        resolve(db);
      }
    };

    request.onerror = () => reject(request.error);
  });
}
export async function addMessage(data) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add({
      ...data,
      createdAt: new Date(),
    });
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllMessages() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function DeleteMessages(id) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => res(true);
    request.onerror = () => rej(request.error);
  });
}


export async function getById( Id ) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(Id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function updateById(id, data) {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Ensure the object has the correct id keyPath before putting
    const toPut = { ...data, id };
    const request = store.put(toPut);

    request.onsuccess = () => resolve("Data saved");
    request.onerror = () => reject(request.error);
  });
}
