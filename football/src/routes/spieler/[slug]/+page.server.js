
import db from "$lib/db.js";

export async function load({ params }) {
  const slug = params.slug; // Beispiel: "Arturo-LUPOLI"
  const [Vorname, Nachname] = slug.split("-");

  // Den Spieler basierend auf Vor- und Nachnamen zu finden
  const player = await db.collection("Spieler").findOne({
    Vorname,
    Nachname,
  });

  // Wenn kein Spieler gefunden wurde, gib einen 404 Status zurück
  if (!player) {
    return {
      status: 404,
      error: new Error("Spieler nicht gefunden"),
    };
  }

  console.log("Geladener Spieler:", player);

  // Bereite die Spielerdaten auf, die an die Svelte-Komponente übergeben werden
  return {
    player: {
      id: player.id || player._id?.toString(), // Nutze MongoDB ObjectID falls vorhanden
      Vorname: player.Vorname,
      Nachname: player.Nachname,
      image: player.image || null, // Falls kein Bild vorhanden
      category: "Spieler",
      nationalitaet: player.Nationalitaet || "Unbekannt", // Standardwert, falls nicht vorhanden
      groesse: player.Groesse || "Unbekannt",
      alter: player.Alter || "Unbekannt",
    },
  };
}
