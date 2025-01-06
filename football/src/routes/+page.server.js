// Import der Datenbanklogik
import db from "$lib/db.js";

export async function load({ url }) {
  // Suchanfrage aus URL extrahieren
  const query = url.searchParams.get("query") || "";
  let searchResults = [];

  // Datenbank durchsuchen, falls eine Suchanfrage vorliegt
  if (query) {
    searchResults = await db.searchDatabase(query);
  }

  // Rückgabe der Suchanfrage und Ergebnisse
  return {
    query,
    searchResults,
  };
}
