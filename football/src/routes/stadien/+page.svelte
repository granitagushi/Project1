<script>
  export let data;

  let results = data.results || [];
  let currentPage = data.page || 1;
  let hasMoreResults = data.hasMore;

  async function loadMore() {
    currentPage++;
    const response = await fetch(`?page=${currentPage}`);
    const newData = await response.json();

    if (newData.results.length > 0) {
      results = [...results, ...newData.results];
    } else {
      hasMoreResults = false; // Keine weiteren Ergebnisse
    }
  }
</script>

<div class="container my-5">
  <h1 class="text-center mb-4">Stadien</h1>

  <div class="row">
    {#each results as result}
      <div class="col-md-4">
        <div class="card mb-4">
          {#if result.image}
            <img
              src={result.image}
              class="card-img-top img-thumbnail"
              alt={result.Name}
              style="max-height: 150px; object-fit: cover;"
            />
          {/if}
          <div class="card-body">
            <h5 class="card-title">
              {result.Name}
            </h5>
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if hasMoreResults}
    <div class="text-center mt-4">
      <button class="btn btn-secondary" on:click={loadMore}>
        Weitere Ergebnisse laden
      </button>
    </div>
  {/if}
</div>

<style>
  .card {
    margin-bottom: 20px;
  }

  .card-img-top {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .btn-secondary {
    margin-top: 20px;
  }
</style>
