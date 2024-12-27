import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let club = {
      Name: data.get("Name"),
      Abkürzung: data.get("Abkürzung"),
      Image: data.get("Image"),
    };
    await db.createClub(club);
    return { success: true };
  },
};
