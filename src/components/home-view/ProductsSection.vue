<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'
import type { ComponentPublicInstance } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const cardsRef = ref<ComponentPublicInstance[]>([])

const products = [
  {
    id: 'a',
    nameKey: 'home.projects.products.a.name',
    descKey: 'home.projects.products.a.description',
    viewKey: 'home.projects.products.a.buttons.view',
    githubKey: 'home.projects.products.a.buttons.github',
    viewHref: 'https://codpex.com/products/login-api',
    githubHref: 'https://github.com/CODPEX/ALoginAPI',
    imageSrc: new URL('@/assets/sections/products/API.png', import.meta.url).href,
  },
  {
    id: 'b',
    nameKey: 'home.projects.products.b.name',
    descKey: 'home.projects.products.b.description',
    viewKey: 'home.projects.products.b.buttons.view',
    githubKey: 'home.projects.products.b.buttons.github',
    viewHref: 'https://codpex.com/products/simple-ssh',
    githubHref: 'https://github.com/CODPEX/SimpleSSH',
    imageSrc: new URL('@/assets/sections/products/sac.png', import.meta.url).href,
  },
]

onMounted(() => {
  cardsRef.value.forEach((card, i) => {
    const el = (card as unknown as { $el: HTMLElement }).$el
    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      },
    )
  })

  const productItems = document.querySelectorAll('.product-item')
  productItems.forEach((item) => {
    const productItem = item as HTMLElement
    const productImage = productItem.querySelector('.product-image') as HTMLElement

    productItem.addEventListener('mouseenter', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      gsap.to(productItem, {
        duration: 0.3,
        y: -10,
        boxShadow: isDark ? '0 24px 48px rgba(0,0,0,0.5)' : '0 20px 40px rgba(79,70,229,0.18)',
        ease: 'power2.out',
      })
      if (productImage) {
        gsap.to(productImage, { duration: 0.3, scale: 1.05, ease: 'power2.out' })
      }
    })
    productItem.addEventListener('mouseleave', () => {
      gsap.to(productItem, { duration: 0.3, y: 0, boxShadow: '0 4px 20px var(--shadow-md)', ease: 'power2.out' })
      if (productImage) {
        gsap.to(productImage, { duration: 0.3, scale: 1, ease: 'power2.out' })
      }
    })
  })

  const productButtons = document.querySelectorAll('.product-button')
  productButtons.forEach((button) => {
    const btn = button as HTMLElement
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { duration: 0.3, scale: 1.05, boxShadow: '0 10px 25px var(--shadow-md)', ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { duration: 0.3, scale: 1, boxShadow: '0 2px 10px var(--shadow-sm)', ease: 'power2.out' })
    })
  })
})
</script>

<template>
  <div class="products-section">
    <div class="products-section-container">
      <div class="products-section-header">
        <span class="products-section-label">{{ t('home.projects.title.a') }}</span>
        <h3 class="products-section-title">{{ t('home.projects.title.b') }}</h3>
        <p class="products-section-description">{{ t('home.projects.description') }}</p>
      </div>

      <div class="products-list">
        <div class="product-item" v-for="product in products" :key="product.id" ref="cardsRef">
          <div class="product-image">
            <img :src="product.imageSrc" :alt="t(product.nameKey)" />
          </div>
          <div class="product-content">
            <h4 class="product-title">
              <span>{{ t(product.nameKey) }}</span>
            </h4>
            <p class="product-description">
              {{ t(product.descKey) }}
            </p>
            <div class="product-buttons">
              <Button
                severity="contrast"
                class="product-button"
                icon="pi pi-external-link"
                :label="t(product.viewKey)"
                as="a"
                :href="product.viewHref"
                target="_blank"
              />
              <Button
                severity="contrast"
                class="product-button"
                icon="pi pi-github"
                :label="t(product.githubKey)"
                as="a"
                :href="product.githubHref"
                target="_blank"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-section-container {
  background: var(--bg-primary);
  padding: 64px 0;
}

.products-section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.products-section-header {
  text-align: center;
  margin-bottom: 48px;
}

.products-section-label {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.products-section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-family: 'DTJBT', sans-serif;
}

.products-section-description {
  max-width: 600px;
  margin: 0 auto;
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.products-list {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 24px;
}

.product-item {
  flex: 1;
  min-width: 320px;
  max-width: 380px;
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 4px 20px var(--shadow-md);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-content {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-family: 'DTJBT', sans-serif;
}

.product-title span {
  background: linear-gradient(to right, var(--accent), #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-description {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.product-buttons {
  display: flex;
  gap: 12px;
}

.product-button {
  flex: 1;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .product-item {
    flex: 1 1 calc(33.333% - 24px);
  }
}

@media (max-width: 768px) {
  .products-section-container {
    padding: 48px 0;
  }

  .products-section-content {
    padding: 0 16px;
  }

  .products-section-title {
    font-size: 24px;
  }

  .products-section-description {
    font-size: 16px;
  }

  .product-item {
    flex: 1 1 100%;
    margin: 0;
    min-width: 280px;
  }

  .product-content {
    padding: 20px;
  }

  .product-buttons {
    flex-direction: column;
  }

  .product-button {
    width: 100%;
  }
}
</style>
