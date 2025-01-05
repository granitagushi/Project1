import db from "$lib/db.js";

export async function load({ url }) {
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;
  const filterSpecific = url.searchParams.get("specific") === "true";

  const players = await db.getPlayers(skip, limit, filterSpecific);

  return {
    results: players,
    page,
    hasMore: players.length === limit,
    entityType: "Spieler",
  };
}
