<script>
  import DirectionCard from '../../components/DirectionCard.svelte';

  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';

  const getPeople = async () => {
    const { data, error } = await supabase.from('people').select().order('id');
    if (!error) {
      return data;
    }
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
  <h1 class="text-center">Our Team</h1>
  {#if people.length}
    {#each people as person, i}
      <div class="row border-bottom">
        <DirectionCard imageSpec={{image: person.image, alt: person.name}} direction={i % 2 ? 'left' : 'right'}>
          <h2>{person.name}, {person.position}</h2>
          <p style="white-space: pre-line">{person.bio}</p>
          <a href="mailto:{person.email}"><p>{person.email}</p></a>
        </DirectionCard>
      </div>
    {/each}
  {/if}
</main>
