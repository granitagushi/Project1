import db from "$lib/db.js";

export async function load({ url }) {
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  const stadiums = await db.getStadiums(skip, limit);

  return {
    results: stadiums,
    page,
    hasMore: stadiums.length === limit,
    entityType: "Stadion",
  };
}
