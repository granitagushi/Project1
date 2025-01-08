<script>
  export let data;

  // Ergebnisse und zusätzliche Daten aus dem Server laden
  let results = data.results || [];
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
</div>

<style>
  /* Gradient-Text */
  .gradient-text {
    background: linear-gradient(90deg, #000000, #141414);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-move 3s infinite;
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
    border-bottom: 1px solid #f2f4f5;
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

 
</style>
