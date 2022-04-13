<script>
  import PersonCard from './PersonCard.svelte';  

  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  const getPeople = async () => {
    const { data, error } = await supabase.from('people').select();
    if (!error) {
      return data;
    }
    console.log(error);
    return [];
  }

  const mapImages = (people) => {
    return people.map((x) => {
      const { publicURL, error } = supabase
        .storage
        .from('mistymountains')
        .getPublicUrl(x.image);
      if (!error) {
        return { ...x, image: publicURL };
      }
      return x;
    });
  }

  let people = [];
  onMount(async () => {
    people = await getPeople().then(mapImages);
  });
</script>

<main>
  {#if people.length}
    {#each people as person, i}
      <div class="row">
        <PersonCard person={person} direction={i % 2 ? 'left' : 'right'} />
      </div>
    {/each}
  {/if}
</main>