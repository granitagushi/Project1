import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    // Spieler-Daten aus dem Formular extrahieren
    let player = {
      Vorname: data.get("Vorname"),
      Nachname: data.get("Nachname"),
      image: data.get("image"),
    };
    // Spieler zur Datenbank hinzufügen
    await db.createPlayer(player);
    return { success: true };
  },
};
