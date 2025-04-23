<script lang="ts">
  // #region Imports
  import { floatingAnimation } from "$lib/actions/floatingAnimation"
  // #endregion Imports

  // #region Types
  type ItemType = "text" | "image"
  // #endregion Types

  // #region Props
  let {
    type = "text",
    text = "",
    imageUrl = "",
    rotate = Math.random() * 90 - 45,
    size = type === "image" ? "3rem" : "auto",
  } = $props<{
    type?: ItemType
    text?: string
    imageUrl?: string
    rotate?: number
    size?: string
  }>()
  // #endregion Props

  // #region Animation Configuration
  // 配置动画选项 - 使用随机初始位置
  const animationOptions = {
    randomPosition: true, // 启用随机位置
    baseSpeed: 0.01,
    accelerationFactor: 3,
    accelerationDuration: 2000,
    accelerationDistance: 150,
  }
  // #endregion Animation Configuration
</script>

<!-- #region Component Rendering -->
{#if type === "text"}
  <!-- #region Text Card -->
  <div
    use:floatingAnimation={animationOptions}
    class="px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight bg-storm w-[12rem] cursor-grab"
    style="rotate: {rotate}deg;"
  >
    {text}
  </div>
  <!-- #endregion Text Card -->
{:else if type === "image"}
  <!-- #region Image Badge -->
  <div
    use:floatingAnimation={animationOptions}
    class="rounded-full overflow-hidden bg-white/10 flex items-center justify-center"
    style="rotate: {rotate}deg; width: {size}; height: {size};"
  >
    <img src={imageUrl} alt="Badge" class="w-full h-full object-contain" />
  </div>
  <!-- #endregion Image Badge -->
{/if}
<!-- #endregion Component Rendering -->
