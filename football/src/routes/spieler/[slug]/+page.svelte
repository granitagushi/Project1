<script>
  export let data;

  console.log("Spieler-Daten:", data.player);

  //delete function
  async function deletePlayer() {
    const id = data.player.id || data.player._id?.toString();

    if (!id) {
      alert("Fehler: Spieler-ID ist nicht verfügbar.");
      console.error("Spieler-ID fehlt:", data.player);
      return;
    }

    const confirmed = confirm(
      `Möchtest du ${data.player.Vorname} ${data.player.Nachname} wirklich löschen?`,
    );

    if (!confirmed) return;

    try {
      console.log("API-Aufruf mit ID:", id);

      const response = await fetch(`/api/delete/${id}?type=Spieler`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Löschen des Spielers.",
        );
      }

      alert("Spieler erfolgreich gelöscht!");
      window.location.href = "/spieler";
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert(`Fehler: ${error.message}`);
    }
  }
</script>

<div class="container my-5">
  <!-- Titel mit Gradient-Effekt -->
  <h1 class="text-center gradient-text mb-4">
    {data.player.Vorname}
    {data.player.Nachname}
  </h1>

  <!-- Spielerbild -->
  {#if data.player.image}
    <div class="text-center">
      <img
        src={data.player.image}
        alt={`${data.player.Vorname} ${data.player.Nachname}`}
        class="img-thumbnail player-img"
      />
    </div>
  {/if}

  <!-- Spielerinformationen -->
  <div class="player-info mt-4 p-4">
    <p><strong>Kategorie:</strong> Spieler</p>
    <p><strong>Spielerstatus:</strong> Aktiv</p>

    {#if data.player.nationalitaet}
      <p><strong>Nationalität:</strong> {data.player.nationalitaet}</p>
    {/if}

    {#if data.player.groesse}
      <p><strong>Grösse:</strong> {data.player.groesse}</p>
    {/if}

    {#if data.player.alter}
      <p><strong>Alter:</strong> {data.player.alter}</p>
    {/if}
  </div>

  <!-- Delete-Button -->
  <div class="text-center mt-4">
    <button on:click={deletePlayer} class="btn btn-danger">
      Löschen
    </button>
  </div>
</div>

<style>
  /* Gradient-Titel */
  .gradient-text {
    background: linear-gradient(90deg, #000000, #141414);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-move 3s infinite;
  }

  /* Spieler-Info-Styling */
  .player-info {
    background-color: #000000;
    color: white;
    border: 1px solid #343a40;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin: 0 auto;
  }

  .player-info p {
    font-size: 1.1rem;
    margin: 10px 0;
    color: #ffffff;
  }

  .player-info strong {
    color: #ffc107;
  }

  /* Spielerbild */
  .player-img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #343a40;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  /* Delete-Button */
  .btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }

  @keyframes gradient-move {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
</style>
