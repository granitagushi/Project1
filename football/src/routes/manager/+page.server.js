import db from "$lib/db.js";

export async function load({ url }) {
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = 30;
  const skip = (page - 1) * limit;

  const managers = await db.getManagers(skip, limit);

  return {
    results: managers,
    page,
    hasMore: managers.length === limit,
    entityType: "Manager",
  };
}
