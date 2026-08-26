<template>
  <div class="product-list">
    <div
      v-for="(product, index) in products"
      :key="product.id"
      :class="['product-item', { left: isLeft(index), right: !isLeft(index) }]"
    >
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
        </div>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-features">
            <div
              v-for="(feature, featureIndex) in product.features"
              :key="featureIndex"
              class="feature-item"
            >
              <span class="feature-check">✓</span>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
          <a :href="product.buttonLink" target="_blank" class="product-btn">
            <i class="pi pi-github"></i> {{ product.buttonText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: string
  name: string
  description: string
  image: string
  features: string[]
  buttonText: string
  buttonLink: string
}

const props = defineProps<{
  products: Product[]
}>()

const isLeft = (index: number): boolean => {
  return index % 2 === 0
}
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-item {
  width: 100%;
  max-width: 1000px;
  border: none;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.product-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 3rem;
}

.product-image-container {
  width: 50%;
  max-width: 500px;
  margin-bottom: 0;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-info {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

/* 确保按钮区不填充满 */
.product-info > * {
  width: auto;
  max-width: 100%;
}

.product-name {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.product-description {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.product-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.feature-check {
  color: var(--accent);
  font-weight: bold;
  font-size: 1.2rem;
  min-width: 20px;
}

.feature-text {
  color: var(--text-primary);
  font-size: 0.9rem;
}

/* 移除按钮自定义样式，使用默认样式 */

.product-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  background: var(--accent);
  color: white;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-btn:hover {
  background: var(--accent);
  opacity: 0.85;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.product-btn i {
  font-size: 1.1rem;
}

.product-item:nth-child(odd) .product-content {
  flex-direction: row;
}

.product-item:nth-child(even) .product-content {
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }

  .product-image-container,
  .product-info {
    width: 100%;
    max-width: 100%;
  }

  .product-info {
    text-align: center;
  }

  .product-button {
    align-self: center;
  }

  .feature-item {
    justify-content: center;
  }
}
</style>
