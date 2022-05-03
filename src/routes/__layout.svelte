<script>
  import NavBar from '../components/NavBar.svelte';
  import Footer from '../components/Footer.svelte';
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast />
<NavBar />
<div class="container my-2">
  <slot />
</div>
<Footer />
