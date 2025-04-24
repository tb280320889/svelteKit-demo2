<script lang="ts">
  import HeroText from "$lib/components/body/hero/HeroText.svelte"
  import ParallaxBackground from "../../body/hero/ParallaxBackground.svelte"
  import Astronaut from "$lib/components/body/hero/Astronaut.svelte"
  import { T } from "@threlte/core"
  import { Canvas } from "@threlte/core"
</script>

<section id="Home"
  class="hero-section c-space"
>
  <HeroText />
  <ParallaxBackground />
  <figure class="absolute inset-0" >
    <Canvas>
      <!-- todo:loader -->
      <T.PerspectiveCamera position={[0, 0.25, 12]} makeDefault />
      <Astronaut />
    </Canvas>

  </figure>
</section>

<style lang="postcss">
  @reference "src/app.css";
.hero-section {
    @apply flex items-start justify-center md:items-start md:justify-start min-h-screen overflow-hidden;
  }
</style>