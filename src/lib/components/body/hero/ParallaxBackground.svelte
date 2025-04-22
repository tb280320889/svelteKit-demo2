<script lang="ts">
  //#region imports
  import { browser } from "$app/environment"
  //#endregion

  //#region state
  let scrollY = $state(0)
  let windowHeight = $state(0)
  //#endregion

  //#region derived values
  // 只在浏览器端计算进度
  const progress = $derived(browser ? scrollY / windowHeight : 0)

  const transforms = $derived({
    mountain3: progress * 40,
    planets: progress * -10,
    mountain2: progress * 20,
    mountain1: progress * 10,
  })

  const backgroundParams = $derived([
    {
      zHight: 50,
      url: "/assets/sky.jpg",
      transform: "",
      delay: "0s",
    },
    {
      zHight: 40,
      url: "/assets/mountain-3.png",
      transform: transforms.mountain3,
      delay: "0.05s",
    },
    {
      zHight: 30,
      url: "/assets/planets.png",
      transform: transforms.planets,
      delay: "0.1s",
    },
    {
      zHight: 20,
      url: "/assets/mountain-2.png",
      transform: transforms.mountain2,
      delay: "0.15s",
    },
    {
      zHight: 10,
      url: "/assets/mountain-1.png",
      transform: transforms.mountain1,
      delay: "0.2s",
    },
  ])
  //#endregion

  //#region event handlers
  function handleScroll() {
    if (!browser) return
    scrollY = window.scrollY
  }

  function handleResize() {
    if (!browser) return
    windowHeight = window.innerHeight
  }
  //#endregion

  //#region lifecycle
  // 初始化窗口高度
  $effect(() => {
    if (browser) {
      handleResize()
    }
  })
  //#endregion
</script>

<!-- #region window events -->
<svelte:window onscroll={handleScroll} onresize={handleResize} />
<!-- #endregion -->

<!-- #region background container -->
<section class="absolute inset-0 bg-black/40">
  <div class="relative h-screen overflow-y-hidden">
    {#each backgroundParams as { zHight, url, transform, delay }}
      <div
        class="absolute inset-0 w-full h-screen"
        style:z-index="-{zHight}"
        style="
            background-image: url({url});
            background-position: bottom;
            background-size: cover;
            transform: {transform ? `translateY(${transform}%)` : 'none'};
            transition: transform 1.2s cubic-bezier(0.4, 0.0, 0.2, 1) {delay};
          "
      ></div>
    {/each}
  </div>
</section>
<!-- #endregion -->
