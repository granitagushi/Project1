import { MongoClient } from "mongodb";
import { DB_URI } from "$env/static/private";


const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("EinzelprojektPT");

export default {
  collection: (name) => db.collection(name),

  addItem: async (data) => {
    const collection = db.collection(data.type);
    const entry = {
      ...data,
      id: Number(data.id),
    };
    return await collection.insertOne(entry);
  },

  getPlayers: async (skip = 0, limit = 30) => {
    const collection = db.collection("Spieler");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, Vorname: 1, Nachname: 1, image: 1 })
      .toArray();
  },

  getClubs: async (skip = 0, limit = 30) => {
    const collection = db.collection("Vereine");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, Name: 1, Abkürzung: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image })) 
      .toArray();
  },

  getManagers: async (skip = 0, limit = 30) => {
    try {
        const collection = db.collection("Manager");
        const managers = await collection
            .find({})
            .skip(skip)
            .limit(limit)
            .project({ _id: 0, Vorname: 1, Nachname: 1, Image: 1 })
            .toArray();
        
        console.log("Managers loaded:", managers);
        return managers.map(doc => ({
            ...doc,
            image: doc.Image
        }));
    } catch (error) {
        console.error("Error loading managers:", error);
        throw new Error("Failed to load managers.");
    }
},


  getStadiums: async (skip = 0, limit = 30) => {
    const collection = db.collection("Stadien");
    return await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .project({ _id: 0, Name: 1 })
      .toArray();
  },

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

    const players = await db.collection("Spieler").find({ $or: searchConditions })
      .project({ _id: 0, Vorname: 1, Nachname: 1, image: 1 })
      .toArray();

    const clubs = await db.collection("Vereine").find({ Name: { $regex: lowerQuery, $options: "i" } })
      .project({ _id: 0, Name: 1, Abkürzung: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image })) 
      .toArray();

    const managers = await db.collection("Manager").find({ $or: searchConditions })
      .project({ _id: 0, Vorname: 1, Nachname: 1, Image: 1 })
      .map((doc) => ({ ...doc, image: doc.Image })) 
      .toArray();

    const stadiums = await db.collection("Stadien").find({ Name: { $regex: lowerQuery, $options: "i" } })
      .project({ _id: 0, Name: 1 })
      .toArray();

    return [
      ...players.map((player) => ({ ...player, type: "Spieler" })),
      ...clubs.map((club) => ({ ...club, type: "Vereine" })),
      ...managers.map((manager) => ({ ...manager, type: "Manager" })),
      ...stadiums.map((stadium) => ({ ...stadium, type: "Stadien" })),
    ];
  },
};
