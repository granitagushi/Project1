<script>
    export let form;
  </script>
  
  <a href="/vereine">Zurück zu Vereinen</a>
  <h1>Verein hinzufügen</h1>
  
  <form method="POST" action="?/create">
    <div class="mb-3">
      <label for="Name" class="form-label">Name</label>
      <input name="Name" id="Name" class="form-control" type="text" required />
    </div>
    <div class="mb-3">
      <label for="Abkürzung" class="form-label">Abkürzung</label>
      <input name="Abkürzung" id="Abkürzung" class="form-control" type="text" required />
    </div>
    <div class="mb-3">
      <label for="Image" class="form-label">Bild-URL</label>
      <input name="Image" id="Image" class="form-control" type="url" required />
    </div>
    <button type="submit" class="btn btn-primary">Verein hinzufügen</button>
  </form>
  
  {#if form?.success}
    <p class="alert alert-success">Verein wurde erfolgreich hinzugefügt!</p>
  {/if}
  