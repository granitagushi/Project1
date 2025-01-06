// Import der Datenbanklogik
import db from "$lib/db.js";
import { ObjectId } from "mongodb";

export async function DELETE({ params, url }) {
  const { id } = params; // ID des Eintrags
  const collectionName = url.searchParams.get("type"); // Sammlungstyp (z. B. Manager, Verein)

  // Eingabevalidierung
  if (!id || !collectionName) {
    return new Response(
      JSON.stringify({ message: "Ungültige ID oder Typ übergeben." }),
      { status: 400 }
    );
  }

  try {
    // Löschoperation
    const result = await db.deleteItem(id, collectionName);

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: `${collectionName}-Eintrag nicht gefunden.` }),
        { status: 404 }
      );
    }

    // Erfolgsantwort
    return new Response(
      JSON.stringify({ message: `${collectionName}-Eintrag erfolgreich gelöscht.` }),
      { status: 200 }
    );
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Löschen des Eintrags:", error);
    return new Response(
      JSON.stringify({ message: "Fehler beim Löschen des Eintrags." }),
      { status: 500 }
    );
  }
}
