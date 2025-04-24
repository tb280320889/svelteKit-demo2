<script lang="ts">
//   import "../app.css"
  import "src/app.css"
  import NavBar from "$lib/components/index/nav/NavBar.svelte"

  let { children } = $props()


</script>

<div class="container mx-auto max-w-7xl">
  <NavBar />

  {@render children()}
</div>
