<script>
    export let form;
  </script>
  
  <a href="/manager">Zurück zu Managern</a>
  <h1>Manager hinzufügen</h1>
  
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
      <label for="Image" class="form-label">Bild-URL</label>
      <input name="Image" id="Image" class="form-control" type="url" required />
    </div>
    <button type="submit" class="btn btn-primary">Manager hinzufügen</button>
  </form>
  
  {#if form?.success}
    <p class="alert alert-success">Manager wurde erfolgreich hinzugefügt!</p>
  {/if}
  