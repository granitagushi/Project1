import db from "$lib/db";

export async function POST({ request }) {
  try {
    const data = await request.json();
    if (!data || !data.type) {
      return new Response("Ungültige Eingabedaten", { status: 400 });
    }

    const result = await db.addItem(data);
    if (result.acknowledged) {
      return new Response(JSON.stringify({ success: true }), { status: 201 });
    } else {
      throw new Error("Fehler beim Speichern des Eintrags");
    }
  } catch (error) {
    console.error("Fehler beim POST:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Speichern des Eintrags" }), { status: 500 });
  }
}
