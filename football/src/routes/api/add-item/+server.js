// Import der Datenbanklogik
import db from "$lib/db";

export async function POST({ request }) {
  try {
    // JSON-Daten aus der Anfrage lesen
    const data = await request.json();

    // Eingabevalidierung
    if (!data || !data.type) {
      return new Response("Ungültige Eingabedaten", { status: 400 });
    }

    // Hinzufügen von Daten in die Datenbank
    const result = await db.addItem(data);
    if (result.acknowledged) {
      // Erfolgsantwort
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    } else {
      throw new Error("Fehler beim Speichern des Eintrags");
    }
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim POST:", error);
    return new Response(
      JSON.stringify({ error: "Fehler beim Speichern des Eintrags" }),
      { status: 500 }
    );
  }
}
