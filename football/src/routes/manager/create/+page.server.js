import db from "$lib/db.js";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let manager = {
      Vorname: data.get("Vorname"),
      Nachname: data.get("Nachname"),
      Image: data.get("Image"),
    };
    await db.createManager(manager);
    return { success: true };
  },
};
