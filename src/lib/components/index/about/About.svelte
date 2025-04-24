<script lang="ts">
  import CopyEmailButton from "../../body/about/CopyEmailButton.svelte"
  import FloatingItem from "../../body/about/FloatingItem.svelte"
  import Globe from "../../body/about/Globe.svelte"
  // import { Pane, Slider } from "svelte-tweakpane-ui"

  // let paneExpanded = $state(false)

  // let left = $state(10)
  // let top = $state(10)

  // 文本卡片数据
  const textCards = [
    { text: "GRASP", rotate: 75 },
    { text: "SOLID", rotate: -30 },
    { text: "Design Patterns", rotate: 90 },
    { text: "Design Principles", rotate: -45 },
    { text: "SRP", rotate: 20 },
  ]

  // 技术图标数据
  const techLogos = [
    { imageUrl: "/assets/logos/svelte.svg" },
    { imageUrl: "/assets/logos/tailwindcss.svg" },
    { imageUrl: "/assets/logos/git.svg" },
    { imageUrl: "/assets/logos/threejs.svg" },
  ]
</script>

<section id="About"
class="c-space section-spacing">
  <h2 class="text-heading">About me</h2>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
    <!-- grid 1 -->
    <div class="flex items-end grid-default-color grid-1">
      <img
        src="assets/coding-pov.png"
        alt="coding-pov"
        class="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
      />
      <div class="z-10">
        <p class="headtext">Hi, I'm Sherlock Tang</p>
        <p class="subtext">
          Over the last 4 years, I developed my frontend and backend dev skills
          to deliver dynamic and software and web applications.
        </p>
      </div>
      <div
        class="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo"
      ></div>
    </div>
    <!-- grid 2 -->
    <div class="grid-default-color grid-2">
      <div class="flex items-center justify-center w-full h-full relative">
        <p class="flex items-end text-5xl text-gray-500">CODE IS CRAFT</p>
        {#each textCards as card}
          <FloatingItem type="text" text={card.text} rotate={card.rotate} />
        {/each}

        <!-- 技术标志 -->
        <div class="absolute inset-0 pointer-events-none">
          {#each techLogos as logo}
            <FloatingItem type="image" imageUrl={logo.imageUrl} />
          {/each}
        </div>
      </div>
    </div>
    <!-- grid 3 -->
    <div class="grid-black-color grid-3 relative">
      <div class="z-10 w-[50%]">
        <p class="headtext">Time Zone</p>
        <p class="subtext">
          I'm based in China, and open to remote work worldwide
        </p>
      </div>
      <figure class="absolute  w-[120%] h-[120%]" style="left: 30%; top: 10%">
      <!-- <figure class="absolute left-[{left}%] top-[{top}%]"> -->
        <Globe />
      </figure>
    </div>
    <!-- grid 4 -->
    <div class="grid-special-color grid-4">
      <div class="flex flex-col items-center justify-center gap-4 size-full">
        <p class="text-center headtext">
          Do you want to start a project together
        </p>
        <CopyEmailButton />
      </div>
    </div>
    <!-- grid 5 -->
    <div class="grid-default-color grid-5"></div>
  </div>
</section>

<!-- <Pane position="draggable" title="Gaussian Splatting" bind:expanded={paneExpanded}>
  <Slider bind:value={left} label="left" min={-100} max={200} step={1} />
  <Slider bind:value={top} label="top" min={-100} max={200} step={1} />
</Pane> -->
