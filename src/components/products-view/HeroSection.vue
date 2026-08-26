<template>
  <div
    style="
      height: 100vh;
      margin: 0;
      z-index: 1;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      color: var(--text-primary);
      position: relative;
      overflow: hidden;
    "
  >
    <!-- 粒子动画容器 -->
    <div ref="particlesContainer" class="particles-container"></div>

    <!-- 几何图形容器 -->
    <div ref="geometricContainer" class="geometric-container"></div>

    <div
      style="
        position: absolute;
        top: -50%;
        right: -20%;
        width: 60%;
        height: 200%;
        background: radial-gradient(
          circle,
          rgba(150, 150, 150, 0.15) 0%,
          rgba(150, 150, 150, 0) 70%
        );
        transform: rotate(30deg);
        z-index: -1;
      "
    ></div>
    <div
      style="
        position: absolute;
        bottom: -30%;
        left: -10%;
        width: 40%;
        height: 150%;
        background: radial-gradient(
          circle,
          rgba(130, 130, 130, 0.15) 0%,
          rgba(130, 130, 130, 0) 70%
        );
        transform: rotate(-20deg);
        z-index: -1;
      "
    ></div>
    <Carousel
      :value="products"
      :numVisible="1"
      :numScroll="1"
      :showNavigators="true"
      :showIndicators="true"
      verticalViewPortHeight="100vh"
      circular
      style="background-color: transparent; z-index: 3"
    >
      <template #item="slotProps">
        <div class="product-card">
          <div class="product-content">
            <div class="product-info">
              <Chip :label="slotProps.data.tag" style="background-color: orange; color: white" />
              <h2 class="product-name">{{ slotProps.data.name }}</h2>
              <p class="product-description">{{ slotProps.data.description }}</p>
              <div class="action-buttons">
                <Button
                  @click="slotProps.data.butonClick"
                  severity="contrast"
                  :label="slotProps.data.buttonLabel"
                />
              </div>
            </div>
            <div class="product-image-container">
              <img :src="slotProps.data.image" :alt="slotProps.data.name" class="product-image" />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const particlesContainer = ref(null)
const geometricContainer = ref(null)
let animationTimeline = null
let geometricTimeline = null

const particles = ref([])
const geometrics = ref([])

const createParticles = () => {
  const particleCount = 50
  const container = particlesContainer.value

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'

    const x = Math.random() * 100
    const y = Math.random() * 100

    const size = Math.random() * 3 + 1
    const opacity = Math.random() * 0.2 + 0.05

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(150, 150, 150, ${opacity});
      border-radius: 50%;
      pointer-events: none;
    `

    container.appendChild(particle)
    particles.value.push({
      element: particle,
      x,
      y,
      size,
      opacity,
    })
  }
}

const createGeometrics = () => {
  const geometricCount = 8
  const container = geometricContainer.value
  const shapes = ['triangle', 'circle', 'square', 'hexagon']

  for (let i = 0; i < geometricCount; i++) {
    const geometric = document.createElement('div')
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    geometric.className = `geometric ${shape}`

    const x = Math.random() * 100
    const y = Math.random() * 100

    const size = Math.random() * 40 + 20
    const rotation = Math.random() * 360
    const opacity = Math.random() * 0.3 + 0.1

    geometric.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      transform: rotate(${rotation}deg);
      pointer-events: none;
    `

    container.appendChild(geometric)
    geometrics.value.push({
      element: geometric,
      x,
      y,
      size,
      rotation,
      opacity,
    })
  }
}

const initParticleAnimation = () => {
  animationTimeline = gsap.timeline({ repeat: -1 })

  particles.value.forEach((particle, index) => {
    const duration = Math.random() * 10 + 10
    const delay = Math.random() * 5

    animationTimeline.to(
      particle.element,
      {
        x: `${Math.random() * 100 - 50}%`,
        y: `${Math.random() * 100 - 50}%`,
        opacity: Math.random() * 0.8 + 0.2,
        duration: duration,
        delay: delay,
        ease: 'none',
      },
      0,
    )
  })
}

const initGeometricAnimation = () => {
  geometricTimeline = gsap.timeline({ repeat: -1 })

  geometrics.value.forEach((geometric, index) => {
    const duration = Math.random() * 15 + 10
    const delay = Math.random() * 5
    const rotation = Math.random() > 0.5 ? 360 : -360

    geometricTimeline.to(
      geometric.element,
      {
        x: `${Math.random() * 100 - 50}%`,
        y: `${Math.random() * 100 - 50}%`,
        rotation: `+=${rotation}`,
        opacity: Math.random() * 0.4 + 0.2,
        duration: duration,
        delay: delay,
        ease: 'none',
      },
      0,
    )
  })
}

const cleanupAnimation = () => {
  if (animationTimeline) {
    animationTimeline.kill()
    animationTimeline = null
  }

  if (geometricTimeline) {
    geometricTimeline.kill()
    geometricTimeline = null
  }

  particles.value.forEach((particle) => {
    if (particle.element.parentNode) {
      particle.element.parentNode.removeChild(particle.element)
    }
  })
  particles.value = []

  geometrics.value.forEach((geometric) => {
    if (geometric.element.parentNode) {
      geometric.element.parentNode.removeChild(geometric.element)
    }
  })
  geometrics.value = []
}

onMounted(() => {
  createParticles()
  createGeometrics()
  initParticleAnimation()
  initGeometricAnimation()
})

onUnmounted(() => {
  cleanupAnimation()
})

const products = ref([
  {
    id: 1,
    tag: t('products.hero.p1.tag'),
    name: 'A-Login API',
    description: t('products.hero.p1.description'),
    image: new URL('@/assets/sections/products/API.png', import.meta.url).href,
    buttonLabel: t('products.hero.p1.buttonLabel'),
    butonClick: () => {
      window.location.href = '/products#aLoginAPI'
    },
  },
  {
    id: 2,
    tag: t('products.hero.p2.tag'),
    name: 'Stars AI Copilot',
    image: new URL('@/assets/sections/products/sac.png', import.meta.url).href,
    description: t('products.hero.p2.description'),
    buttonLabel: t('products.hero.p2.buttonLabel'),
    butonClick: () => {
      window.location.href = '/products#sac'
    },
  },
])
</script>

<style scoped>
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.geometric-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none; /* 禁用鼠标事件 */
}

.particle {
  position: absolute;
  background: rgba(150, 150, 150, 0.15);
  border-radius: 50%;
  pointer-events: none;
}

.geometric {
  position: absolute;
  pointer-events: none;
}

.geometric.triangle {
  width: 0;
  height: 0;
  background: transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 26px solid rgba(100, 150, 200, 0.3);
}

.geometric.circle {
  border-radius: 50%;
  background: rgba(200, 100, 150, 0.3);
}

.geometric.square {
  background: rgba(150, 200, 100, 0.3);
}

.geometric.hexagon {
  background: rgba(100, 200, 150, 0.3);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.product-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 94vh;
  background-color: transparent;
  position: relative;
  z-index: 2;
}

.product-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  max-width: 1200px;
}

.product-image-container {
  position: relative;
  width: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.05);
  padding: 20px;
  backdrop-filter: blur(10px);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
}

.product-image:hover {
  transform: scale(1.03) translateY(-5px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 15px 30px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

/* 图片加载动画 */
.product-image {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 为不同产品添加不同的动画延迟 */
.product-card:nth-child(1) .product-image {
  animation-delay: 0.1s;
}

.product-card:nth-child(2) .product-image {
  animation-delay: 0.2s;
}

.product-card:nth-child(3) .product-image {
  animation-delay: 0.3s;
}

/* 添加光泽效果 */
.product-image-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 60%
  );
  transform: rotate(30deg);
  transition: all 0.8s ease;
  opacity: 0;
  z-index: 1;
}

.product-image-container:hover::before {
  opacity: 1;
  transform: rotate(30deg) translate(20%, 20%);
}

.product-info {
  padding: 3rem;
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.product-name {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'DTJBT', sans-serif;
}

.product-description {
  font-size: 1.4rem;
  margin-bottom: 2rem;
  margin-top: 5px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  width: 100%;
}

.wishlist-btn,
.cart-btn {
  padding: 0.8rem 1.5rem;
  font-weight: 600;
}

.cart-btn {
  background: var(--primary-color);
  border: none;
}

/* 响应式设计 */
@media (max-width: 1400px) {
  .product-content {
    width: 90%;
  }

  .product-name {
    font-size: 2.2rem;
  }

  .product-description {
    font-size: 1.2rem;
  }

  .product-info {
    padding: 2.5rem;
  }
}

@media (max-width: 1200px) {
  .product-content {
    width: 95%;
  }

  .product-name {
    font-size: 2rem;
  }

  .product-description {
    font-size: 1.1rem;
  }

  .product-info {
    padding: 2rem;
  }

  .product-image-container {
    padding: 15px;
  }
}

@media (max-width: 992px) {
  .product-card {
    height: auto;
    min-height: 80vh;
  }

  .product-content {
    flex-direction: column;
    width: 90%;
    gap: 2rem;
  }

  .product-info,
  .product-image-container {
    width: 100%;
  }

  .product-info {
    text-align: center;
    align-items: center;
    padding: 1.5rem;
  }

  .product-image-container {
    height: 60vh;
    padding: 20px;
  }

  .product-name {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .product-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .action-buttons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .product-card {
    min-height: 70vh;
  }

  .product-content {
    width: 95%;
    gap: 1.5rem;
  }

  .product-info {
    padding: 1rem;
  }

  .product-image-container {
    height: 50vh;
    padding: 15px;
    border-radius: 15px;
  }

  .product-name {
    font-size: 1.6rem;
  }

  .product-description {
    font-size: 0.9rem;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
  }

  .wishlist-btn,
  .cart-btn {
    width: 100%;
    max-width: 250px;
  }
}

@media (max-width: 576px) {
  .product-card {
    min-height: 60vh;
  }

  .product-content {
    width: 100%;
    gap: 1rem;
    padding: 0 10px;
  }

  .product-info {
    padding: 0.8rem;
  }

  .product-image-container {
    height: 40vh;
    padding: 10px;
    border-radius: 12px;
  }

  .product-name {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .product-description {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  .chip {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
  }
}

@media (max-width: 400px) {
  .product-card {
    min-height: 50vh;
  }

  .product-content {
    gap: 0.8rem;
  }

  .product-info {
    padding: 0.5rem;
  }

  .product-image-container {
    height: 35vh;
    padding: 8px;
  }

  .product-name {
    font-size: 1.2rem;
  }

  .product-description {
    font-size: 0.75rem;
  }

  .button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}
</style>
