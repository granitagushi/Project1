import db from "$lib/db.js";

export async function load({ url }) {
  const query = url.searchParams.get("query") || "";
  let searchResults = [];

  if (query) {
    searchResults = await db.searchDatabase(query);
  }

  return {
    query,
    searchResults,
  };
}
