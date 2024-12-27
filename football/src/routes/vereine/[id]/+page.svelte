<script>
  export let data;
  let club = data.club;
</script>

<a href="/vereine">Zurück zu Vereinen</a>

<h1>{club.Name}</h1>
<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={club.Image} alt="{club.Name}" />
  </div>
  <div class="col">
    <p>Abkürzung: {club.Abkürzung}</p>
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={club._id}>
      <button class="btn btn-danger">Verein löschen</button>
    </form>
  </div>
</div>
