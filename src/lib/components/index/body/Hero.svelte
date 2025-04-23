<script lang="ts">
  import HeroText from "$lib/components/body/hero/HeroText.svelte"
  import ParallaxBackground from "../../body/hero/ParallaxBackground.svelte"
  import Astronaut from "$lib/components/body/hero/Astronaut.svelte"
  import { T } from "@threlte/core"
  import { Canvas } from "@threlte/core"
  // 移除 OrbitControls 导入，因为我们不再需要它
</script>

<section
  class="hero-section c-space"
>
  <HeroText />
  <ParallaxBackground />
  <figure class="absolute inset-0" style="width:100vw;height:100vh;pointer-events:auto;z-index:10;">
    <Canvas>
      <T.PerspectiveCamera position={[0, 0.5, 15]} makeDefault />
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