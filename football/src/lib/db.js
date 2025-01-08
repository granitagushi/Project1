// Datenbankverbindung herstellen
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("EinzelprojektPT");

// Exportierte Funktionen
export default {
  // Sammlung referenzieren
  collection: (name) => db.collection(name),

  // Element hinzufügen
  addItem: async (data) => {
    const collection = db.collection(data.type);
    const entry = {
      ...data,
      id: Number(data.id),
    };
    return await collection.insertOne(entry);
  },

  // Element löschen
  deleteItem: async (id, collectionName) => {
    try {
      const collection = db.collection(collectionName);

      let query = {};
      if (!isNaN(id)) {
        query = { id: Number(id) };
      } else if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        throw new Error("Ungültiges ID-Format. ID muss numerisch oder ein gültiger ObjectId-String sein.");
      }

      const result = await collection.deleteOne(query);

      if (result.deletedCount === 0) {
        console.warn("Kein Dokument zum Löschen gefunden:", id);
      } else {
        console.log("Dokument erfolgreich gelöscht:", id);
      }

      return result;
    } catch (error) {
      console.error("Fehler beim Löschen des Dokuments:", error);
      throw new Error("Fehler beim Löschen des Dokuments.");
    }
  },

  // Spieler abfragen
  getPlayers: async (skip = 0, limit = 30) => {
    const collection = db.collection("Spieler");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, id: 1, Vorname: 1, Nachname: 1, image: 1 })
      .toArray();
  },

  // Vereine abfragen
  getClubs: async (skip = 0, limit = 30) => {
    const collection = db.collection("Vereine");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, id: 1, Name: 1, Abkürzung: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image }))
      .toArray();
  },

  // Manager abfragen
  getManagers: async (skip = 0, limit = 30) => {
    const collection = db.collection("Manager");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, id: 1, Vorname: 1, Nachname: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image }))
      .toArray();
  },

  // Stadien abfragen
  getStadiums: async (skip = 0, limit = 30) => {
    const collection = db.collection("Stadien");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, id: 1, Name: 1 })
      .toArray();
  },

  // Datenbank durchsuchen
  searchDatabase: async (query) => {
    const lowerQuery = query.toLowerCase();
    const terms = lowerQuery.split(" ");

    let searchConditions = [];
    if (terms.length > 1) {
      searchConditions.push({
        $and: [
          { Vorname: { $regex: terms[0], $options: "i" } },
          { Nachname: { $regex: terms[1], $options: "i" } },
        ],
      });
      searchConditions.push({
        $and: [
          { Nachname: { $regex: terms[0], $options: "i" } },
          { Vorname: { $regex: terms[1], $options: "i" } },
        ],
      });
    } else {
      searchConditions.push({
        $or: [
          { Vorname: { $regex: lowerQuery, $options: "i" } },
          { Nachname: { $regex: lowerQuery, $options: "i" } },
        ],
      });
    }

    const players = await db.collection("Spieler")
      .find({ $or: searchConditions })
      .project({ _id: 0, id: 1, Vorname: 1, Nachname: 1, image: 1 })
      .toArray();

    const clubs = await db.collection("Vereine")
      .find({ Name: { $regex: lowerQuery, $options: "i" } })
      .project({ _id: 0, id: 1, Name: 1, Abkürzung: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image }))
      .toArray();

    const managers = await db.collection("Manager")
      .find({ $or: searchConditions })
      .project({ _id: 0, id: 1, Vorname: 1, Nachname: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image }))
      .toArray();

    const stadiums = await db.collection("Stadien")
      .find({ Name: { $regex: lowerQuery, $options: "i" } })
      .project({ _id: 0, id: 1, Name: 1 })
      .toArray();

    return [
      ...players.map((player) => ({ ...player, type: "Spieler" })),
      ...clubs.map((club) => ({ ...club, type: "Vereine" })),
      ...managers.map((manager) => ({ ...manager, type: "Manager" })),
      ...stadiums.map((stadium) => ({ ...stadium, type: "Stadien" })),
    ];
  },
};
