<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = [
  { name: 'Aurora-Star-Launcher', desc: 'Next-gen Minecraft launcher', icon: 'pi pi-gamepad', color: '#e74c3c', url: 'https://github.com/CODPEX/Aurora-Star-Launcher' },
  { name: 'StarsAICopilot', desc: 'AI-powered code assistant', icon: 'pi pi-robot', color: '#9b59b6', url: 'https://github.com/CODPEX/StarsAICopilot.Avalonia' },
  { name: 'SimpleSSH', desc: 'Fluent SSH client for Windows', icon: 'pi pi-terminal', color: '#2ecc71', url: 'https://github.com/CODPEX/SimpleSSH' },
  { name: 'Open.StarsAPI', desc: 'Authentication & data API', icon: 'pi pi-api', color: '#3498db', url: 'https://github.com/CODPEX/Open.StarsAPI' },
  { name: 'A-Login API', desc: 'Python Flask auth solution', icon: 'pi pi-lock', color: '#e67e22', url: 'https://github.com/CODPEX/ALoginAPI' },
  { name: 'EasyGit', desc: 'Beginner-friendly Git wrapper', icon: 'pi pi-git', color: '#f39c12', url: 'https://github.com/CODPEX/EasyGit' },
  { name: 'S-AI Music', desc: 'Smart weather-adaptive music', icon: 'pi pi-music', color: '#1abc9c', url: 'https://github.com/CODPEX/SAIMusic' },
  { name: 'SkyBBS', desc: 'Community forum platform', icon: 'pi pi-comments', color: '#34495e', url: 'https://github.com/CODPEX/SkyBBS-python' },
]

const features = ref([
  { icon: 'pi pi-rocket', title: 'High Performance', desc: 'Optimized codebase for fast loading times' },
  { icon: 'pi pi-shield', title: 'Security First', desc: 'Enterprise-grade security in every product' },
  { icon: 'pi pi-code', title: 'Open Source', desc: 'Transparent and community-driven development' },
  { icon: 'pi pi-sync', title: 'Cross Platform', desc: 'Works seamlessly across all major platforms' },
])

onMounted(() => {
  const cards = document.querySelectorAll('.project-card')
  cards.forEach((card) => {
    const el = card as HTMLElement
    el.addEventListener('mouseenter', () => { gsap.to(el, { y: -6, duration: 0.3, ease: 'power2.out' }) })
    el.addEventListener('mouseleave', () => { gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' }) })
  })
})
</script>

<template>
  <div class="about-view">
    <div class="about-hero">
      <div class="hero-badge">CODPEX</div>
      <h1>{{ t('about.hero.title') }}</h1>
      <p class="hero-desc">{{ t('about.hero.description') }}</p>
    </div>
    <div class="section mission">
      <div class="section-container">
        <h2>{{ t('about.mission.title') }}</h2>
        <p>{{ t('about.mission.description') }}</p>
      </div>
    </div>
    <div class="section projects">
      <div class="section-container">
        <h2>{{ t('about.projects.title') }}</h2>
        <div class="project-grid">
          <a v-for="p in projects" :key="p.name" :href="p.url" target="_blank" class="project-card">
            <div class="project-icon" :style="{ background: p.color }"><i :class="p.icon"></i></div>
            <div class="project-info"><h3>{{ p.name }}</h3><p>{{ p.desc }}</p></div>
            <i class="pi pi-external-link project-arrow"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="section values">
      <div class="section-container">
        <h2>{{ t('about.values.title') }}</h2>
        <div class="values-grid">
          <div v-for="(f, i) in features" :key="i" class="feature-card">
            <i :class="f.icon" class="feature-icon"></i>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section cta">
      <div class="section-container">
        <h2>{{ t('about.cta.title') }}</h2>
        <p>{{ t('about.cta.description') }}</p>
        <div class="cta-buttons">
          <Button severity="contrast" :label="t('about.cta.github')" icon="pi pi-github" as="a" href="https://github.com/CODPEX" target="_blank" />
          <Button severity="secondary" :label="t('about.cta.docs')" icon="pi pi-book" as="a" href="https://docs.codpex.top" target="_blank" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view { background: var(--bg-primary); }
.about-hero { text-align: center; padding: 120px 24px 80px; background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); }
.hero-badge { display: inline-block; padding: 6px 16px; background: var(--accent-light); color: var(--accent); border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; }
.about-hero h1 { font-size: 3rem; font-weight: 800; color: var(--text-primary); margin: 0 0 20px; font-family: 'DTJBT', sans-serif; line-height: 1.2; }
.hero-desc { font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.7; }
.section { padding: 80px 24px; }
.section-container { max-width: 1100px; margin: 0 auto; }
.section h2 { font-size: 2rem; font-weight: 700; color: var(--text-primary); text-align: center; margin-bottom: 48px; font-family: 'DTJBT', sans-serif; }
.mission { background: linear-gradient(135deg, var(--accent) 0%, #7c3aed 100%); color: white; }
.mission h2 { color: white; }
.mission p { text-align: center; font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.8; opacity: 0.9; }
.projects { background: var(--bg-secondary); }
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.project-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: var(--bg-card); border-radius: 12px; text-decoration: none; color: inherit; box-shadow: 0 2px 8px var(--shadow-sm); border: 1px solid var(--border-color); transition: all 0.3s ease; }
.project-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px var(--shadow-lg); border-color: var(--accent); }
.project-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.project-icon i { font-size: 1.3rem; color: white; }
.project-info { flex: 1; min-width: 0; }
.project-info h3 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 4px; }
.project-info p { font-size: 0.8rem; color: var(--text-secondary); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.project-arrow { font-size: 1rem; color: var(--text-muted); transition: all 0.3s ease; }
.project-card:hover .project-arrow { color: var(--accent); transform: translate(3px, -3px); }
.values-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
.feature-card { text-align: center; padding: 32px 20px; background: var(--bg-card); border-radius: 16px; box-shadow: 0 2px 12px var(--shadow-sm); border: 1px solid var(--border-color); transition: all 0.3s ease; }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px var(--shadow-lg); }
.feature-icon { font-size: 2rem; color: var(--accent); margin-bottom: 16px; }
.feature-card h3 { font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin: 0 0 8px; }
.feature-card p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; line-height: 1.5; }
.cta { background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); text-align: center; }
.cta h2 { color: var(--text-primary); }
.cta p { font-size: 1.1rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto 32px; line-height: 1.7; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
@media (max-width: 768px) { .about-hero h1 { font-size: 2rem; } .about-hero { padding: 80px 16px 60px; } .section { padding: 60px 16px; } .section h2 { font-size: 1.5rem; } .project-grid { grid-template-columns: 1fr; } }
</style>
