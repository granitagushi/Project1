<script>
  // Datenübergabe und Initialisierung
  export let data;

  let query = data.query || "";
  let searchResults = data.searchResults || [];
  let noSearchPerformed = !query;

  let newItem = {
    type: "",
    Vorname: "",
    Nachname: "",
    Name: "",
    Abkürzung: "",
    image: "",
  };

  // Eintrag hinzufügen
  const addItem = async () => {
    if (newItem.type === "Manager" || newItem.type === "Vereine") {
      newItem.Image = newItem.image;
      delete newItem.image;
    }
    const response = await fetch("/api/add-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      alert("Eintrag erfolgreich hinzugefügt!");
      location.reload();
    } else {
      alert("Fehler beim Hinzufügen des Eintrags.");
    }
  };

  // Anzeige der Eingabefelder basierend auf Typ
  const showField = (field) => {
    if (newItem.type === "Spieler" || newItem.type === "Manager") {
      return field === "Vorname" || field === "Nachname" || field === "image";
    }
    if (newItem.type === "Vereine") {
      return field === "Name" || field === "Abkürzung" || field === "image";
    }
    if (newItem.type === "Stadien") {
      return field === "Name";
    }
    return false;
  };

  // Suchfunktion
  const performSearch = () => {
    if (query) {
      window.location.href = `/?query=${query}`;
    }
  };
</script>

<!-- Hauptcontainer -->
<div class="container my-5">
  <!-- Überschrift -->
  <h1 class="text-center mb-4 gradient-text">
    <i class="fas fa-globe"></i> Willkommen zur Football World
    <i class="fas fa-globe"></i>
  </h1>

  <!-- Suchleiste -->
  <div class="mb-4">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Suchen Sie nach Spielern, Vereinen, Stadien oder Managern"
        bind:value={query}
      />
      <button class="btn btn-primary" on:click={performSearch}>Suchen</button>
    </div>
  </div>

  <!-- Suchergebnisse -->
  {#if query && searchResults.length > 0}
    <div class="row">
      {#each searchResults as result}
        <div class="col-md-4">
          <div class="card shadow-sm">
            {#if result.image}
              <img
                src={result.image}
                class="card-img-top img-thumbnail mx-auto mt-3"
                alt={result.Name || `${result.Vorname} ${result.Nachname}`}
              />
            {/if}
            <div class="card-body text-center">
              <h5 class="card-title">
                {result.Name || `${result.Vorname} ${result.Nachname}`}
              </h5>
              {#if result.Abkürzung}
                <p class="card-text">
                  <strong>Abkürzung:</strong>
                  {result.Abkürzung}
                </p>
              {/if}
              <p class="card-text"><strong>Kategorie:</strong> {result.type}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if query}
    <p class="text-center text-danger">
      Keine Ergebnisse für "{query}" gefunden
    </p>
  {/if}

  <!-- Formular für neuen Eintrag -->
  <h2 class="mt-5">Neuen Eintrag hinzufügen</h2>
  <form>
    <div class="form-group mb-3">
      <label for="type">Kategorie:</label>
      <select id="type" class="form-control" bind:value={newItem.type}>
        <option value="Spieler">Spieler</option>
        <option value="Vereine">Verein</option>
        <option value="Manager">Manager</option>
        <option value="Stadien">Stadion</option>
      </select>
    </div>

    {#if showField("Vorname")}
      <div class="form-group mb-3">
        <label for="vorname">Vorname:</label>
        <input
          id="vorname"
          type="text"
          class="form-control"
          bind:value={newItem.Vorname}
          placeholder="Vorname"
        />
      </div>
    {/if}

    {#if showField("Nachname")}
      <div class="form-group mb-3">
        <label for="nachname">Nachname:</label>
        <input
          id="nachname"
          type="text"
          class="form-control"
          bind:value={newItem.Nachname}
          placeholder="Nachname"
        />
      </div>
    {/if}

    {#if showField("Name")}
      <div class="form-group mb-3">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          class="form-control"
          bind:value={newItem.Name}
          placeholder="Name"
        />
      </div>
    {/if}

    {#if showField("Abkürzung")}
      <div class="form-group mb-3">
        <label for="abkuerzung">Abkürzung (nur für Vereine):</label>
        <input
          id="abkuerzung"
          type="text"
          class="form-control"
          bind:value={newItem.Abkürzung}
          placeholder="Abkürzung"
        />
      </div>
    {/if}

    {#if showField("image")}
      <div class="form-group mb-3">
        <label for="image">Bild-URL:</label>
        <input
          id="image"
          type="text"
          class="form-control"
          bind:value={newItem.image}
          placeholder="Bild-URL"
        />
      </div>
    {/if}

    <button
      class="btn mt-3"
      type="button"
      on:click={addItem}
      style="background-color: black; color: white;"
    >
      Eintrag hinzufügen
    </button>
  </form>
</div>

<style>
  .card {
    background-color: #000000;
    color: white;
    border: 1px solid #343a40;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  .card-title {
    color: #ffc107;
  }

  .card-text {
    color: #ced4da;
  }

  .gradient-text {
    background: linear-gradient(90deg, #000000, #141414);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-move 3s infinite;
  }

  .input-group {
    max-width: 600px;
    margin: 0 auto;
  }

  .img-thumbnail {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #343a40;
  }
</style>
