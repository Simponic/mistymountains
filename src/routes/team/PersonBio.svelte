<script>
  export let bio;
  let showMore = false;
</script>

<main>
  {#if showMore}
    <p>{bio}</p>
    <button on:click={() => showMore = false}>Show Less</button>
  {:else}
    <p>{bio.substr(0, bio.lastIndexOf(' ', 150)) + '...'}</p>
    <button on:click={() => showMore = true}>Show More</button>
  {/if}
</main>

<style>
  p {
    white-space: pre-line;
  }
</style>