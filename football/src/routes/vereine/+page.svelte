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
      hasMoreResults = false;
    }
  }
</script>

<div class="container my-5">
  <h1 class="text-center mb-4">Vereine</h1>

  <div class="row">
    {#each results as result}
      <div class="col-md-4">
        <div class="card mb-4">
          {#if result.Image}
            <img
              src={result.Image}
              class="card-img-top img-thumbnail"
              alt={result.Name}
              style="max-height: 150px; object-fit: cover;"
            />
          {/if}
          <div class="card-body">
            <h5 class="card-title">{result.Name}</h5>
            <p class="card-text"><strong>Abkürzung:</strong> {result.Abkürzung}</p>
            <p class="card-text"><strong>Kategorie:</strong> Verein</p>
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
  .img-thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
  .btn-secondary {
    margin-top: 20px;
  }
</style>
