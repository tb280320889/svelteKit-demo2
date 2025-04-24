<script lang="ts">
  import { onMount } from "svelte"
  import { browser } from "$app/environment"
  import { pushState } from "$app/navigation"

  let isScrolled = $state(false)
  let isMenuOpen = $state(false)

  // 监听滚动事件，改变导航栏样式
  onMount(() => {
    if (!browser) return

    const handleScroll = () => {
      isScrolled = window.scrollY > 50
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  // 平滑滚动到指定部分
  function scrollToSection(e: Event, id: string) {
    e.preventDefault()

    if (!browser) return

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })

      // 更新 URL
      pushState(`#${id}`, `#${id}`)

      // 如果在移动设备上，关闭菜单
      if (isMenuOpen) {
        isMenuOpen = false
      }
    }
  }

  let tos = ["Home", "About"]
</script>

<!-- #region 封装重复html模板 -->
{#snippet Navigation(tos: string[])}
  {#each tos as to}
    <li class="nav-li">
      <a class="nav-link" href="#{to}"
      onclick={(e) => scrollToSection(e, to)}>
        {to}
      </a>
    </li>
  {/each}
{/snippet}
<!-- #endregion -->

<!-- #region 主导航栏 -->
<nav class="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
  <!-- #region 容器 -->
  <div class="mx-auto c-space max-w-7xl">
    <div class="flex items-center justify-between py-2 sm:py-0">
      <!-- #region Logo -->
      <a
        href="/"
        class="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition duration-300"
      >
        Sherlock Tang
      </a>
      <!-- #endregion -->

      <!-- #region 移动端菜单按钮 -->
      <button
        onclick={() => (isMenuOpen = !isMenuOpen)}
        class="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
        ><img
          src={isMenuOpen ? "assets/close.svg" : "assets/menu.svg"}
          alt="toggle"
          class="w-6 h-6"
        /></button
      >
      <!-- #endregion -->

      <!-- #region 桌面端导航 -->
      <nav class="hidden sm:flex">
        <ul class="nav-ul">
          {@render Navigation(tos)}
        </ul>
      </nav>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region 移动端菜单 -->
  <!-- todo:添加动效 -->
  {#if isMenuOpen}
    <div class="block overflow-hidden text-center sm:hidden">
      <nav class="pb-5">
        <ul class="nav-ul">
          {@render Navigation(tos)}
        </ul>
      </nav>
    </div>
  {/if}
  <!-- #endregion -->
</nav>
<!-- #endregion -->
