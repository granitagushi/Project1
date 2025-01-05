<script>
  export let data;

  // Ergebnisse und zusätzliche Daten aus dem Server laden
  let results = data.results || [];
  let currentPage = data.page || 1;
  let hasMoreResults = data.hasMore;

  // Funktion zum Laden weiterer Spieler, falls die Ergebnisse paginiert sind
  async function loadMore() {
    currentPage++;
    const response = await fetch(`?page=${currentPage}`);
    const newData = await response.json();

    if (newData.results.length > 0) {
      results = [...results, ...newData.results];
    } else {
      hasMoreResults = false;
    }
  }
</script>

<div class="container my-5">
  <!-- Überschrift mit Gradient-Effekt -->
  <h1 class="text-center gradient-text mb-4">{data.entityType}</h1>

  <!-- Spieler-Namen als Links anzeigen -->
  <div class="list-group shadow-sm">
    {#each results as result}
      <a
        href={`/spieler/${result.Vorname}-${result.Nachname}`}
        class="list-group-item list-group-item-action"
      >
        <i class="fas fa-user"></i> {result.Vorname} {result.Nachname}
      </a>
    {/each}
  </div>

  <!-- "Weitere Ergebnisse laden"-Button anzeigen, falls mehr Spieler vorhanden sind -->
  {#if hasMoreResults}
    <div class="text-center mt-4">
      <button class="btn btn-success btn-lg" on:click={loadMore}>
        Weitere Ergebnisse laden
      </button>
    </div>
  {/if}

  <!-- Löschformular, spezifisch für Arturo Lupoli -->
  <form method="POST" action="/spieler/delete">
    <input type="hidden" name="id" value="676b0489ebb60619e4cd4b76" /> <!-- MongoDB ObjectId -->
    <button class="btn btn-danger">Spieler löschen</button>
  </form>
</div>

<style>
  /* Gradient-Text */
  .gradient-text {
    background: linear-gradient(90deg, #000000, #141414);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-move 3s infinite;
  }

  @keyframes gradient-move {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }

  /* Liste der Spieler */
  .list-group {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
  }

  .list-group-item {
    font-size: 18px;
    padding: 15px 20px;
    color: white;
    background-color: #000;
    border-bottom: 1px solid #343a40;
    transition: background-color 0.2s ease;
  }

  .list-group-item:hover {
    background-color: #343a40;
    color: #ffc107;
  }

  .list-group-item i {
    margin-right: 10px;
    color: #ffc107;
  }

  /* "Weitere Ergebnisse laden"-Button */
  .btn-success {
    padding: 10px 20px;
    font-size: 1.2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-success:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
</style>
