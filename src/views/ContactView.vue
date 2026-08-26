<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactMethods = ref([
  { icon: 'pi pi-envelope', title: 'Email', value: 'support@codpex.top', link: 'mailto:support@codpex.top' },
  { icon: 'pi pi-github', title: 'GitHub', value: 'github.com/CODPEX', link: 'https://github.com/CODPEX' },
  { icon: 'pi pi-comments', title: 'Issues', value: 'Report issues on GitHub', link: 'https://github.com/CODPEX/.github/issues' },
])
</script>

<template>
  <div class="contact-view">
    <div class="contact-hero">
      <h2>{{ t('contact.page.title') }}</h2>
      <p>{{ t('contact.page.description') }}</p>
    </div>
    <div class="contact-content">
      <div class="contact-methods">
        <div v-for="m in contactMethods" :key="m.title" class="method-card">
          <div class="method-icon"><i :class="m.icon"></i></div>
          <h3>{{ m.title }}</h3>
          <p>{{ m.value }}</p>
          <a :href="m.link" target="_blank" class="method-link">
            {{ t('contact.page.open') }} <i class="pi pi-external-link ml-1"></i>
          </a>
        </div>
      </div>
      <div class="social-links">
        <h3>{{ t('contact.page.follow') }}</h3>
        <div class="social-icons">
          <a href="https://github.com/CODPEX" target="_blank" class="social-icon"><i class="pi pi-github"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-view { min-height: calc(100vh - 200px); padding: 80px 24px 60px; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); }
.contact-hero { text-align: center; max-width: 700px; margin: 0 auto 60px; }
.contact-hero h2 { font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; font-family: 'DTJBT', sans-serif; }
.contact-hero p { font-size: 1.1rem; color: var(--text-secondary); line-height: 1.6; }
.contact-content { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 60px; }
.contact-methods { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.method-card { background: var(--bg-card); border-radius: 16px; padding: 32px 24px; text-align: center; box-shadow: 0 4px 20px var(--shadow-md); border: 1px solid var(--border-color); transition: all 0.3s ease; }
.method-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px var(--shadow-lg); }
.method-icon { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #8b5cf6); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.method-icon i { font-size: 1.5rem; color: white; }
.method-card h3 { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 8px; }
.method-card p { font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px; }
.method-link { font-size: 0.85rem; color: var(--accent); text-decoration: none; font-weight: 500; }
.method-link:hover { text-decoration: underline; }
.social-links { text-align: center; }
.social-links h3 { font-size: 1.2rem; color: var(--text-primary); margin-bottom: 20px; }
.social-icons { display: flex; justify-content: center; gap: 16px; }
.social-icon { width: 50px; height: 50px; border-radius: 50%; background: var(--text-primary); display: flex; align-items: center; justify-content: center; color: var(--bg-primary); font-size: 1.4rem; text-decoration: none; transition: all 0.3s ease; }
.social-icon:hover { background: var(--accent); transform: scale(1.1); }
@media (max-width: 768px) { .contact-hero h2 { font-size: 1.8rem; } .contact-view { padding: 60px 16px 40px; } }
</style>
