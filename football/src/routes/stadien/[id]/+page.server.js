import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    stadium: await db.getStadiumById(params.id),
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteStadium(data.get("id"));
    throw redirect(303, "/stadien");
  },
};
