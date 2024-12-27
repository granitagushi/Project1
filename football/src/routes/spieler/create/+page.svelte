<script>
    export let form; // Erfolgsstatus vom Server
  </script>
  
  <a href="/spieler">Zurück zu Spielern</a>
  <h1>Spieler hinzufügen</h1>
  
  <form method="POST" action="?/create">
    <div class="mb-3">
      <label for="Vorname" class="form-label">Vorname</label>
      <input name="Vorname" id="Vorname" class="form-control" type="text" required />
    </div>
    <div class="mb-3">
      <label for="Nachname" class="form-label">Nachname</label>
      <input name="Nachname" id="Nachname" class="form-control" type="text" required />
    </div>
    <div class="mb-3">
      <label for="image" class="form-label">Bild-URL</label>
      <input name="image" id="image" class="form-control" type="url" required />
    </div>
    <button type="submit" class="btn btn-primary">Spieler hinzufügen</button>
  </form>
  
  {#if form?.success}
    <p class="alert alert-success">Spieler wurde erfolgreich hinzugefügt!</p>
  {/if}
  
  <style>
    h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }
    form {
      max-width: 400px;
      margin: 0 auto;
    }
    .btn {
      margin-top: 20px;
    }
    .alert {
      margin-top: 20px;
      color: green;
    }
  </style>
  