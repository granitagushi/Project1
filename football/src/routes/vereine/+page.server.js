import db from "$lib/db.js";

export async function load({ url }) {
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  const clubs = await db.getClubs(skip, limit);

  return {
    results: clubs,
    page,
    hasMore: clubs.length === limit,
    entityType: "Verein",
  };
}
