<script lang="ts">
  import createGlobe, { type COBEOptions } from "cobe"
  import { Spring } from "svelte/motion"

  const MOVEMENT_DAMPING = 1400

  const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
      { location: [14.5995, 120.9842], size: 0.03 },
      { location: [19.076, 72.8777], size: 0.1 },
      { location: [23.8103, 90.4125], size: 0.05 },
      { location: [30.0444, 31.2357], size: 0.07 },
      { location: [39.9042, 116.4074], size: 0.08 },
      { location: [-23.5505, -46.6333], size: 0.1 },
      { location: [19.4326, -99.1332], size: 0.1 },
      { location: [40.7128, -74.006], size: 0.1 },
      { location: [34.6937, 135.5022], size: 0.05 },
      { location: [41.0082, 28.9784], size: 0.06 },
    ],
  }

  // Props
  let { className = "", config = GLOBE_CONFIG } = $props<{
    className?: string
    config?: COBEOptions
  }>()

  // State
  let phi = $state(0)
  let width = $state(0)
  let canvasRef = $state<HTMLCanvasElement | null>(null)
  let pointerInteracting = $state<number | null>(null)
  let pointerInteractionMovement = $state(0)

  // Spring animation
  let r = $state(0)
  const rs = new Spring(() => r, {
    stiffness: 0.1,
    damping: 0.3,
  })

  // Functions
  function updatePointerInteraction(value: number | null) {
    pointerInteracting = value
    if (canvasRef) {
      canvasRef.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  function updateMovement(clientX: number) {
    if (pointerInteracting !== null) {
      const delta = clientX - pointerInteracting
      pointerInteractionMovement = delta
      r = r + delta / MOVEMENT_DAMPING
    }
  }

  // Lifecycle
  $effect(() => {
    const onResize = () => {
      if (canvasRef) {
        width = canvasRef.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting) phi += 0.005
        state.phi = phi + rs.current()
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => (canvasRef!.style.opacity = "1"), 0)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  })
</script>

<div class="absolute inset-0 aspect-[1/1] w-full max-w-[600px] {className}">
  <canvas
    class="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
    bind:this={canvasRef}
    onpointerdown={(e) => {
      pointerInteracting = e.clientX
      updatePointerInteraction(e.clientX)
    }}
    onpointerup={() => updatePointerInteraction(null)}
    onpointerout={() => updatePointerInteraction(null)}
    onmousemove={(e) => updateMovement(e.clientX)}
    ontouchmove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
  ></canvas>
</div>
