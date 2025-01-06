<script>
  // Datenübergabe und Initialisierung
  export let data;

  let results = data.results || [];

  // Funktion: Verein löschen
  async function deleteClub(id) {
    if (!id) {
      alert("Fehler: Vereins-ID ist nicht verfügbar.");
      return;
    }

    const confirmed = confirm(`Möchtest du diesen Verein wirklich löschen?`);

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/delete/${id}?type=Vereine`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fehler beim Löschen des Vereins.");
      }

      alert("Verein erfolgreich gelöscht!");
      results = results.filter((club) => club.id !== id); // Liste aktualisieren
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert(`Fehler: ${error.message}`);
    }
  }
</script>

<div class="container my-5">
  <!-- Überschrift -->
  <h1 class="text-center mb-4">Vereine</h1>

  <div class="row">
    {#each results as result}
    <div class="col-md-4">
      <div class="card mb-4">
        {#if result.Image}
        <img
          src={result.Image}
          class="card-img-top img-thumbnail"
          alt={result.Name}
          style="max-height: 150px; object-fit: cover;"
        />
        {/if}
        <div class="card-body">
          <!-- Vereins-Details -->
          <h5 class="card-title">{result.Name}</h5>
          <p class="card-text"><strong>Abkürzung:</strong> {result.Abkürzung}</p>
          <p class="card-text"><strong>Kategorie:</strong> Verein</p>
          <button on:click={() => deleteClub(result.id)} class="btn btn-danger">
            Löschen
          </button>
        </div>
      </div>
    </div>
    {/each}
  </div>
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

  .btn-danger {
    margin-top: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 0.9rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-danger:hover {
    background-color: #c82333;
  }
</style>
