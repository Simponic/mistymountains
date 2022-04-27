<script>
  export let imageSpec;
  export let direction;
</script>

<main>
  {#if direction == 'right'}
    <div class="row d-flex align-items-center my-2">
      <div class="col-md-4 text-center order-sm-1">
        <img class="img-fluid rounded shadow" src={imageSpec.image} alt={imageSpec.alt} />
      </div>
      <div class="col-md-8 border p-2 bg-light rounded shadow order-sm-2">
        <slot />
      </div>
    </div>
  {:else}
    <div class="row d-flex align-items-center my-2">
      <div class="col-md-8 border p-2 bg-light rounded shadow order-md-first order-last">
        <slot />
      </div>
      <div class="col-md-4 text-center">
        <img class="img-fluid rounded shadow" src={imageSpec.image} alt={imageSpec.alt} />
      </div>
    </div>
  {/if}
</main>

<style>
  p {
    white-space: pre-wrap;
  }
</style>
