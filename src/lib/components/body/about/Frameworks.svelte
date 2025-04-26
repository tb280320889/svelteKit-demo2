<script lang="ts">
  import { cn } from "$lib/utils"
  import OrbitingCircles from "src/lib/actions/OrbitingCircles.svelte"
  let { class: className = "" } = $props<{ class?: string }>()

  const skills = [
    "auth0",
    "css3",
    "git",
    "html5",
    "javascript",
    "microsoft",
    "sqlite",
    "tailwindcss",
    "vitejs",
    "svelte",
  ]

  const arraySize = skills.length
</script>

<div
  class={cn(
    "relative flex h-[15rem] w-full flex-col items-center justify-center",
    className
  )}
>
  <span
    class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"
  >
    Svelte
  </span>
  {#each skills as skill, index}
    <OrbitingCircles
      class="h-[30px] w-[30px] border-none bg-transparent"
      radius={80}
      delay={index * 10}
      {arraySize}
      {index}
    >
      <img
        src={`/assets/logos/${skill}.svg`}
        class="h-full w-full"
        alt="${skill}logo"
      />
    </OrbitingCircles>
  {/each}
  {#each [...skills].reverse() as skill, index}
    <OrbitingCircles
      class="h-[45px] w-[45px] border-none bg-transparent --angle={(360 /
        skills.length) *
        index}deg"
      speed={2}
      radius={160}
      delay={index * 10}
      {arraySize}
      {index}
      reverse
    >
      <img
        src={`/assets/logos/${skill}.svg`}
        class="h-full w-full"
        alt="${skill}logo"
      />
    </OrbitingCircles>
  {/each}
</div>
