import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    manager: await db.getManagerById(params.id),
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteManager(data.get("id"));
    throw redirect(303, "/manager");
  },
};
