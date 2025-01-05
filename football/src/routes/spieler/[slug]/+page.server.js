import db from "$lib/db.js";

export async function load({ params }) {
  const slug = params.slug; // Beispiel: "Lionel-Messi"
  const [Vorname, Nachname] = slug.split("-");

  const player = await db.collection("Spieler").findOne({
    Vorname,
    Nachname,
  });

  if (!player) {
    return {
      status: 404,
      error: new Error("Spieler nicht gefunden"),
    };
  }

  return {
    player: {
      Vorname: player.Vorname,
      Nachname: player.Nachname,
      image: player.image || null,
      category: "Spieler", // Beispielwert, falls keine Kategorie existiert
      nationalitaet: player.Nationalitaet || "Unbekannt", // Nationalität
      groesse: player.Groesse || "Unbekannt", // Grösse in cm
      alter: player.Alter || "Unbekannt", // Alter in Jahren
    },
  };
}
