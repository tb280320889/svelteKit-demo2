<script lang="ts">
  import HeroText from "$lib/components/body/hero/HeroText.svelte"
  import ParallaxBackground from "../../body/hero/ParallaxBackground.svelte"
</script>

<section
  class="hero-section c-space"
>
  <HeroText />
  <ParallaxBackground />
</section>

<style lang="postcss">
  @reference "src/app.css";
.hero-section {
    @apply flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden;
  }
</style>