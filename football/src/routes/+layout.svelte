<script>
  import "./style.css"; 
  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  />
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</svelte:head>

<nav
  class="navbar navbar-expand-lg bg-dark"
  data-bs-theme="dark"
>
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <i class="fas fa-futbol"></i> <span class="shadow-text">Football World</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/spieler">
            <i class="fas fa-user"></i> Spieler
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/vereine">
            <i class="fas fa-shield-alt"></i> Vereine
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/manager">
            <i class="fas fa-chalkboard-teacher"></i> Manager
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/stadien">
            <i class="fas fa-building"></i> Stadien
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-3">
  {@render children()}
</div>

<footer class="text-center mt-4">
  <p>© 2024 Football World. Alle Rechte vorbehalten.</p>
</footer>
