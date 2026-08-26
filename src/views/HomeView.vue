<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import HeroSection from '@/components/home-view/HeroSection.vue'
import ToolsSection from '@/components/home-view/ToolsSection.vue'
import FeaturesSection from '@/components/home-view/FeaturesSection.vue'
import ProductsSection from '@/components/home-view/ProductsSection.vue'
import ContactSection from '@/components/home-view/ContactSection.vue'

const canvasRef = ref<HTMLCanvasElement>()
let animationFrameId: number | null = null
let ctx: CanvasRenderingContext2D | null = null
let glowEffects: any[] = []
let gridAnimationProgress = 0
let animationPhase = 'grid'

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  const isDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark'
  const getColors = () => {
    if (isDarkMode()) {
      return {
        bg: '#0f172a',
        gridStroke: 'rgba(99, 102, 241, 0.08)',
        colors: [
          'hsla(243, 71%, 52%, 0.45)',
          'hsla(271, 76%, 53%, 0.4)',
          'hsla(262, 65%, 50%, 0.4)',
          'hsla(250, 69%, 52%, 0.45)',
        ],
      }
    }
    return {
      bg: '#ffffff',
      gridStroke: 'rgba(79, 70, 229, 0.06)',
      colors: [
        'hsla(236, 71%, 55%, 0.3)',
        'hsla(271, 71%, 55%, 0.25)',
        'hsla(262, 65%, 55%, 0.25)',
        'hsla(250, 69%, 55%, 0.3)',
      ],
    }
  }

  // Generate adjacent colors
  const generateAdjacentColors = (): { color1: string; color2: string }[] => {
    const baseHue = Math.random() * 360
    const colors: { color1: string; color2: string }[] = []

    for (let i = 0; i < 4; i++) {
      const hue = (baseHue + i * 30) % 360
      const color1 = `hsla(${hue}, 70%, 60%, ${Math.random() * 0.4 + 0.3})`
      const color2 = `hsla(${(hue + 15) % 360}, 70%, 60%, 0)`
      colors.push({ color1, color2 })
    }

    return colors
  }

  // Create 4 glow effects from each direction
  const createGlowEffects = () => {
    glowEffects = []
    const directions = [0, 1, 2, 3] // Top, Right, Bottom, Left
    const colors = generateAdjacentColors()

    directions.forEach((direction, index) => {
      let x, y

      switch (direction) {
        case 0: // Top
          x = canvas.width / 2
          y = -100
          break
        case 1: // Right
          x = canvas.width + 100
          y = canvas.height / 2
          break
        case 2: // Bottom
          x = canvas.width / 2
          y = canvas.height + 100
          break
        case 3: // Left
          x = -100
          y = canvas.height / 2
          break
      }

      const color = colors[index] || { color1: 'hsla(0, 0%, 0%, 0)', color2: 'hsla(0, 0%, 0%, 0)' }

      glowEffects.push({
        x,
        y,
        size: 0,
        maxSize: Math.random() * 200 + 150,
        speed: Math.random() * 0.8 + 0.5,
        targetX: canvas.width / 2,
        targetY: canvas.height / 2,
        color1: color.color1,
        color2: color.color2,
        progress: 0,
        reachedCenter: false,
        vx: 0,
        vy: 0,
        entanglementRadius: 150,
      })
    })
  }

  createGlowEffects()

  // Grid animation
  let gridTween = gsap.to(
    { progress: 0 },
    {
      progress: 1,
      duration: 1,
      onUpdate: function () {
        gridAnimationProgress = this.progress()
      },
      onComplete: () => {
        animationPhase = 'glow'
      },
    },
  )

  // Animation loop
  const animate = () => {
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Clear canvas
    ctx!.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    const colors = getColors()
    ctx!.fillStyle = colors.bg
    ctx!.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid with animation
    ctx!.strokeStyle = colors.gridStroke
    ctx!.lineWidth = 0.5

    const gridSize = 40
    const maxLinesX = Math.ceil(canvas.width / gridSize)
    const maxLinesY = Math.ceil(canvas.height / gridSize)

    // Calculate visible lines based on animation progress
    const visibleLinesX = Math.floor(maxLinesX * gridAnimationProgress)
    const visibleLinesY = Math.floor(maxLinesY * gridAnimationProgress)

    // Vertical lines
    for (let i = 0; i <= visibleLinesX; i++) {
      const x = i * gridSize
      ctx!.beginPath()
      ctx!.moveTo(x, 0)
      ctx!.lineTo(x, canvas.height)
      ctx!.stroke()
    }

    // Horizontal lines
    for (let i = 0; i <= visibleLinesY; i++) {
      const y = i * gridSize
      ctx!.beginPath()
      ctx!.moveTo(0, y)
      ctx!.lineTo(canvas.width, y)
      ctx!.stroke()
    }

    // Update and draw glow effects
    glowEffects.forEach((glow, index) => {
      if (animationPhase === 'glow') {
        if (!glow.reachedCenter) {
          // Calculate direction to center
          const dx = centerX - glow.x
          const dy = centerY - glow.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance > 20) {
            const directionX = dx / distance
            const directionY = dy / distance

            // Move towards center
            glow.x += directionX * glow.speed
            glow.y += directionY * glow.speed

            // Increase size
            glow.size += glow.speed * 0.3
          } else {
            // Reached center
            glow.reachedCenter = true
            glow.speed = 0.5

            // Set initial velocity for entanglement
            glow.vx = (Math.random() - 0.5) * 0.8
            glow.vy = (Math.random() - 0.5) * 0.8
          }
        } else {
          // Entanglement effect
          glowEffects.forEach((otherGlow, otherIndex) => {
            if (index !== otherIndex) {
              const dx = otherGlow.x - glow.x
              const dy = otherGlow.y - glow.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < glow.entanglementRadius) {
                const force = (glow.entanglementRadius - distance) / glow.entanglementRadius
                const directionX = dx / distance
                const directionY = dy / distance

                // Apply entanglement force
                glow.vx += directionX * force * 0.05
                glow.vy += directionY * force * 0.05
              }
            }
          })

          // Update position
          glow.x += glow.vx
          glow.y += glow.vy

          // Add some damping
          glow.vx *= 0.95
          glow.vy *= 0.95

          // Keep within bounds
          if (glow.x < 0 || glow.x > canvas.width) glow.vx *= -0.8
          if (glow.y < 0 || glow.y > canvas.height) glow.vy *= -0.8

          glow.x = Math.max(0, Math.min(canvas.width, glow.x))
          glow.y = Math.max(0, Math.min(canvas.height, glow.y))
        }

        // Draw gradient glow
        const gradient = ctx!.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.size)
        gradient.addColorStop(0, glow.color1)
        gradient.addColorStop(1, glow.color2)

        ctx!.beginPath()
        ctx!.arc(glow.x, glow.y, glow.size, 0, Math.PI * 2)
        ctx!.fillStyle = gradient
        ctx!.fill()
      }
    })

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', () => {})
})
</script>
<template>
  <div class="home-view">
    <canvas ref="canvasRef" class="canvas-background"></canvas>
    <HeroSection />
    <ToolsSection />
    <FeaturesSection />
    <ProductsSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
}

.canvas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
