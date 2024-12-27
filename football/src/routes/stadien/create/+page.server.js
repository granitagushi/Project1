import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let stadium = {
      Name: data.get("Name"),
    };
    await db.createStadium(stadium);
    return { success: true };
  },
};
