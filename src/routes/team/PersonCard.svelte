<script>
  import PersonBio from './PersonBio.svelte';  

  export let person;
  export let direction;
</script>

<main>
  <div class="row">
    {#if direction == 'right'}
      <div class="col-sm-3">
        <img class="img-fluid" src={person.image} alt={person.name} />
      </div>
      <div class="col-sm-9">
        <PersonBio bio={person.bio} />
      </div>
    {:else}
      <div class="col-sm-9">
        <PersonBio bio={person.bio} />
      </div>
      <div class="col-sm-3">
        <img class="img-fluid" src={person.image} alt={person.name} />
      </div>
    {/if}
  </div>
</main>