<script lang="ts">
  let copied = $state(false)
  const email = "Your Email Address"
  function setCopied(bool: boolean) {
    copied = bool
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
</script>

<button
  onclick={copyToClipboard}
  class="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden"
>
  <!-- todo:add animation -->
  {#if copied}
    <div class="flex items-center justify-center gap-2">
      <img src="assets/copy-done.svg" class="w-5" alt="copy Icon" />
      <p>Email has Copied</p>
    </div>
  {:else}
    <div class="flex items-center justify-center gap-2">
      <img src="assets/copy.svg" class="w-5" alt="copy icon" />
      <p>Copy Email Address</p>
    </div>
  {/if}
</button>
