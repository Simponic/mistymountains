<script>
  export let person;
  export let direction;
</script>

<main>
  {#if direction == 'right'}
    <div class="row d-flex align-items-center my-2">
      <div class="col-md-4 text-center">
        <img class="img-fluid rounded shadow" src={person.image} alt={person.name} />
      </div>
      <div class="col-md-8 border p-2 bg-light rounded shadow">
        <h2>{person.name}, {person.position}</h2>
        <p>{person.bio}</p>
        <a href="mailto:{person.email}"><p>{person.email}</p></a>
      </div>
    </div>
  {:else}
    <div class="row d-flex align-items-center my-2">
      <div class="col-md-8 border p-2 bg-light rounded shadow">
        <h2>{person.name}, {person.position}</h2>
        <p>{person.bio}</p>
        <a href="mailto:{person.email}"><p>{person.email}</p></a>
      </div>
      <div class="col-md-4 text-center">
        <img class="img-fluid rounded shadow" src={person.image} alt={person.name} />
      </div>
    </div>
  {/if}
</main>

<style>
  p {
    white-space: pre-wrap;
  }
</style>
