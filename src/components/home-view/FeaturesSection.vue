<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

onMounted(() => {
  const featureItems = document.querySelectorAll('.feature-item')
  featureItems.forEach((item) => {
    const featureItem = item as HTMLElement

    featureItem.addEventListener('mouseenter', () => {
      gsap.to(featureItem, {
        duration: 0.3,
        x: 5,
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
        ease: 'power2.out',
      })
    })

    featureItem.addEventListener('mouseleave', () => {
      gsap.to(featureItem, {
        duration: 0.3,
        x: 0,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        ease: 'power2.out',
      })
    })
  })
})
</script>

<template>
  <div class="features-section-container">
    <div class="features-section-content">
      <div class="features-section-header">
        <span class="features-section-label">{{ t('home.features.title.a') }}</span>
        <h3 class="features-section-title">{{ t('home.features.title.b') }}</h3>
        <p class="features-section-description">
          {{ t('home.features.description') }}
        </p>
      </div>

      <div class="features-list">
        <div class="feature-item">
          <span class="feature-label">{{ t('home.features.items.a.label') }}</span>
          <h3 class="feature-title">{{ t('home.features.items.a.title') }}</h3>
          <p class="feature-description">
            {{ t('home.features.items.a.description') }}
          </p>
        </div>

        <div class="feature-item">
          <span class="feature-label">{{ t('home.features.items.b.label') }}</span>
          <h3 class="feature-title">{{ t('home.features.items.b.title') }}</h3>
          <p class="feature-description">
            {{ t('home.features.items.b.description') }}
          </p>
        </div>

        <div class="feature-item">
          <span class="feature-label">{{ t('home.features.items.c.label') }}</span>
          <h3 class="feature-title">{{ t('home.features.items.c.title') }}</h3>
          <p class="feature-description">
            {{ t('home.features.items.c.description') }}
          </p>
        </div>

        <div class="feature-item">
          <span class="feature-label">{{ t('home.features.items.d.label') }}</span>
          <h3 class="feature-title">{{ t('home.features.items.d.title') }}</h3>
          <p class="feature-description">
            {{ t('home.features.items.d.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-section-container {
  background-color: var(--bg-secondary);
  padding: 64px 0;
}

.features-section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.features-section-header {
  text-align: center;
  margin-bottom: 48px;
}

.features-section-label {
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.features-section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-family: 'DTJBT', sans-serif;
}

.features-section-description {
  max-width: 600px;
  margin: 0 auto;
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.features-list {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.feature-item {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  padding: 24px;
  background: linear-gradient(to bottom right, var(--bg-card), var(--bg-secondary));
  border-radius: 12px;
  box-shadow: 0 2px 10px var(--shadow-sm);
  transition: all 0.3s ease;
  margin: 0 12px;
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px var(--shadow-md);
}

.feature-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-family: 'DTJBT', sans-serif;
}

.feature-description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .feature-item {
    flex: 1 1 calc(50% - 24px);
  }
}

@media (max-width: 768px) {
  .features-section-container {
    padding: 48px 0;
  }

  .features-section-content {
    padding: 0 16px;
  }

  .features-section-title {
    font-size: 24px;
  }

  .features-section-description {
    font-size: 16px;
  }

  .feature-item {
    flex: 1 1 100%;
    margin: 0;
  }

  .feature-title {
    font-size: 18px;
  }

  .feature-description {
    font-size: 14px;
  }
}
</style>
