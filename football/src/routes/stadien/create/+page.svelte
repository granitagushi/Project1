<script>
    export let form;
  </script>
  
  <a href="/stadien">Zurück zu Stadien</a>
  <h1>Stadion hinzufügen</h1>
  
  <form method="POST" action="?/create">
    <div class="mb-3">
      <label for="Name" class="form-label">Name</label>
      <input name="Name" id="Name" class="form-control" type="text" required />
    </div>
    <button type="submit" class="btn btn-primary">Stadion hinzufügen</button>
  </form>
  
  {#if form?.success}
    <p class="alert alert-success">Stadion wurde erfolgreich hinzugefügt!</p>
  {/if}
  