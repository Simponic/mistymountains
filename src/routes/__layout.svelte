<script>
  import NavBar from '../components/NavBar.svelte';
  import Footer from '../components/Footer.svelte';
  import '../app.css';
</script>

<NavBar />
<div class="container my-2">
  <slot />
</div>
<Footer />
