import db from "$lib/db.js";

export async function load({ url }) {
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 30; // Anzahl der Ergebnisse pro Seite
  const skip = (page - 1) * limit; // Ergebnisse überspringen, basierend auf der aktuellen Seite

  const players = await db.getPlayers(skip, limit);

  return {
    results: players,
    page,
    hasMore: players.length === limit, // Wenn weniger als limit Ergebnisse da sind, gibt es keine weiteren
    entityType: "Spieler",
  };
}
