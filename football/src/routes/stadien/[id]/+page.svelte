<script>
  export let data;
  let stadium = data.stadium;
</script>

<a href="/stadien">Zurück zu Stadien</a>

<h1>{stadium.Name}</h1>
<div class="row mt-3">
  <div class="col">
    <p>ID: {stadium.id}</p>
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={stadium._id}>
      <button class="btn btn-danger">Stadion löschen</button>
    </form>
  </div>
</div>
