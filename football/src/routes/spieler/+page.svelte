<script>
  export let data;

  let results = data.results || [];
  let currentPage = data.page || 1; // Aktuelle Seite
  let hasMoreResults = data.hasMore; // Gibt an, ob weitere Ergebnisse verfügbar sind

  // Funktion: Weitere Ergebnisse laden
  async function loadMore() {
    currentPage++; // Erhöhe die Seite um 1
    const response = await fetch(`?page=${currentPage}`); // Anfrage für nächste Seite
    const newData = await response.json(); // Lade neue Daten

    if (newData.results.length > 0) {
      results = [...results, ...newData.results]; // Neue Daten hinzufügen
    } else {
      hasMoreResults = false; // Keine weiteren Ergebnisse
    }
  }
</script>

<div class="container my-5">
  <h1 class="text-center mb-4">{data.entityType}</h1>

  <!-- Spielerliste -->
  <div class="row">
    {#each results as result}
      <div class="col-md-4">
        <div class="card mb-4">
          {#if result.image}
            <img
              src={result.image}
              class="card-img-top img-thumbnail"
              alt={`${result.Vorname} ${result.Nachname}`}
              style="max-height: 150px; object-fit: cover;"
            />
          {/if}
          <div class="card-body">
            <h5 class="card-title">
              {result.Vorname} {result.Nachname}
            </h5>
            <p class="card-text"><strong>Kategorie:</strong> Spieler</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- "Weitere Ergebnisse laden"-Button -->
  {#if hasMoreResults}
    <div class="text-center mt-4">
      <button class="btn btn-secondary" on:click={loadMore}>
        Weitere Ergebnisse laden
      </button>
    </div>
  {/if}
</div>

<style>
  .card {
    margin-bottom: 20px;
  }

  .card-img-top {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  .img-thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
  .btn-secondary {
    margin-top: 20px;
  }
</style>
