<script>
  import DirectionCard from '../../components/DirectionCard.svelte';
</script>

<main>
  <h1 class="text-center">Services</h1>
  <DirectionCard direction="left" imageSpec={{image: "https://ztxoywaazhxdeiftmsiy.supabase.co/storage/v1/object/public/mistymountains/girl.jpg", alt: "Girl looking at camera"}}>
    <h2>Therapy</h2>
    <ul>
      <li>Addiction</li>
      <li>Adolescents</li>
      <li>ADHD</li>
      <li>Anxiety</li>
      <li>Autism Spectrum</li>
      <li>Couples</li>
      <li>Depression</li>
      <li>Families</li>
      <li>Gender Identity</li>
      <li>Individuals</li>
      <li>LGBTQ+</li>
      <li>Roommates/Friends</li>
      <li>Sexuality</li>
      <li>And more</li>
    </ul>
  </DirectionCard>
  <DirectionCard direction="right" imageSpec={{image: "https://ztxoywaazhxdeiftmsiy.supabase.co/storage/v1/object/public/mistymountains/guy.jpg", alt: "Boy smiling to left"}}>
    <h2>Screeners</h2>
    <ul>
      <li>ADHD</li>
      <li>Anxiety</li>
      <li>Autism</li>
      <li>Depression</li>
      <li>Intimacy Anorexia</li>
      <li>Obsessive Compulsive Disorder (OCD)</li>
      <li>Post Traumatic Stress Disorder (PTSD)</li>
      <li>Sex Addiction</li>
      <li>Sexual Anorexia</li>
      <li>Suicidal Ideation</li>
    </ul>
  </DirectionCard>
</main>
