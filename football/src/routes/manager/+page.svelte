<script>
  export let data; // Datenübergabe an die Komponente

  let results = data.results || []; // Manager-Liste initialisieren

  // Funktion: Manager löschen
  async function deleteManager(id) {
    if (!id) {
      alert("Fehler: Manager-ID ist nicht verfügbar.");
      return;
    }

    const confirmed = confirm(`Möchtest du diesen Manager wirklich löschen?`);

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/delete/${id}?type=Manager`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Fehler beim Löschen des Managers."
        );
      }

      alert("Manager erfolgreich gelöscht!");
      results = results.filter((manager) => manager.id !== id); // Liste aktualisieren
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert(`Fehler: ${error.message}`);
    }
  }
</script>

<div class="container my-5">
  <!-- Überschrift -->
  <h1 class="text-center mb-4">Manager</h1>

  <div class="row">
    {#each results as result}
    <div class="col-md-4">
      <div class="card mb-4">
        {#if result.Image}
        <img
          src={result.Image}
          class="card-img-top img-thumbnail"
          alt={`${result.Vorname} ${result.Nachname}`}
          style="max-height: 150px; object-fit: cover;"
        />
        {/if}
        <div class="card-body">
          <!-- Manager-Details -->
          <h5 class="card-title">
            {result.Vorname} {result.Nachname}
          </h5>
          <p class="card-text"><strong>Kategorie:</strong> Manager</p>
          <!-- Löschen-Button -->
          <button
            on:click={() => deleteManager(result.id)}
            class="btn btn-danger"
          >
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
