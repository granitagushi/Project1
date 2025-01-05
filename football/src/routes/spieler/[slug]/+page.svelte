<script>
    export let data;
  </script>
  
  <div class="container my-5">
    <!-- Titel mit Gradient-Effekt -->
    <h1 class="text-center gradient-text mb-4">
      {data.player.Vorname} {data.player.Nachname}
    </h1>
  
    <!-- Spielerbild -->
    {#if data.player.image}
      <div class="text-center">
        <img
          src={data.player.image}
          alt={`${data.player.Vorname} ${data.player.Nachname}`}
          class="img-thumbnail player-img"
        />
      </div>
    {/if}
  
    <!-- Spielerinformationen -->
    <div class="player-info mt-4 p-4">
      <p>
        <strong>Kategorie:</strong> Spieler
      </p>
      <p>
        <strong>Spielerstatus:</strong> Aktiv
      </p>
  
      {#if data.player.nationalitaet}
        <p>
          <strong>Nationalität:</strong> {data.player.nationalitaet}
        </p>
      {/if}
  
      {#if data.player.groesse}
        <p>
          <strong>Grösse:</strong> {data.player.groesse}
        </p>
      {/if}
  
      {#if data.player.alter}
        <p>
          <strong>Alter:</strong>  {data.player.alter} 
        </p>
      {/if}
    </div>
  </div>
  
  <style>
    /* Konsistente Farben und Effekte */
    .gradient-text {
      background: linear-gradient(90deg, #000000, #141414);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradient-move 3s infinite;
    }
  
    .player-info {
      background-color: #000000;
      color: white;
      border: 1px solid #343a40;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      margin: 0 auto;
    }
  
    .player-info p {
      font-size: 1.1rem;
      margin: 10px 0;
      color: #ffffff;
    }
  
    .player-info strong {
      color: #ffc107;
    }
  
    .player-img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 50%;
      border: 3px solid #343a40;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    @keyframes gradient-move {
      0% {
        background-position: 0%;
      }
      100% {
        background-position: 100%;
      }
    }
  </style>
  