import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    player: await db.getPlayerById(params.id),
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deletePlayer(data.get("id"));
    throw redirect(303, "/spieler");
  },
};
