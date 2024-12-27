<script>
    export let data;
    let manager = data.manager;
  </script>
  
  <a href="/manager">Zurück zu Managern</a>
  
  <h1>{manager.Vorname} {manager.Nachname}</h1>
  <div class="row mt-3">
    <div class="col-3">
      <img class="img-fluid" src={manager.Image} alt="{manager.Vorname}" />
    </div>
    <div class="col">
      <p>ID: {manager.id}</p>
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={manager._id}>
        <button class="btn btn-danger">Manager löschen</button>
      </form>
    </div>
  </div>
  