<script>
  // Import von CSS-Styles und Initialisierung
  import "./style.css"; 
  let { children } = $props();
</script>

<!-- Navigationsleiste -->
<nav
  class="navbar navbar-expand-lg bg-dark"
  data-bs-theme="dark"
>
  <div class="container-fluid">
    <!-- Logo und Markenname -->
    <a class="navbar-brand" href="/">
      <i class="fas fa-futbol"></i> <span class="shadow-text">Football World</span>
    </a>
    <!-- Toggle-Button für mobile Ansicht -->
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
      <!-- Navigationslinks -->
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

<!-- Hauptinhalt -->
<div class="container mt-3">
  {@render children()}
</div>

<!-- Fusszeile -->
<footer class="text-center mt-4">
  <p>© 2024 Football World. Alle Rechte vorbehalten.</p>
</footer>
