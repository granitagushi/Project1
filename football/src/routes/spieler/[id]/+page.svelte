<script>
  export let data;
  let player = data.player;
</script>

<a href="/spieler">Zurück zu Spielern</a>

<h1>{player.Vorname} {player.Nachname}</h1>
<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={player.image} alt="{player.Vorname}" />
  </div>
  <div class="col">
    <p>ID: {player.id}</p>
    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={player._id}>
      <button class="btn btn-danger">Spieler löschen</button>
    </form>
  </div>
</div>
