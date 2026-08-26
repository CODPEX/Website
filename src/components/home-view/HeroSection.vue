<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import gsap from 'gsap'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const titleRef = ref<HTMLHeadingElement>()
const subtitleRef = ref<HTMLParagraphElement>()
const buttonGroupRef = ref<HTMLDivElement>()
const heroContentRef = ref<HTMLElement>()
const isDark = computed(() => document.documentElement.getAttribute('data-theme') === 'dark')

onMounted(() => {
  if (!titleRef.value || !subtitleRef.value || !buttonGroupRef.value || !heroContentRef.value) return

  gsap.fromTo(heroContentRef.value.querySelector('.hero-bg-layer'), { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' })

  gsap.fromTo(titleRef.value, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.6)', delay: 0.3 })
  gsap.fromTo(subtitleRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 })

  const btns = buttonGroupRef.value.children
  gsap.fromTo(btns, { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)', delay: 1 })

  Array.from(btns).forEach((btn) => {
    const el = btn as HTMLElement
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { duration: 0.3, scale: 1.06, y: -3, boxShadow: `0 12px 32px ${isDark.value ? 'rgba(129,140,248,0.35)' : 'rgba(79,70,229,0.35)'}`, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { duration: 0.3, scale: 1, y: 0, boxShadow: 'none', ease: 'power2.out' })
    })
  })
})
</script>

<template>
  <div class="hero-content" ref="heroContentRef">
    <div class="hero-bg-layer">
      <div class="hero-orb orb-1"></div>
      <div class="hero-orb orb-2"></div>
      <div class="hero-orb orb-3"></div>
      <div class="hero-orb orb-4"></div>
    </div>
    <h3 ref="titleRef">
      From
      <span class="hero-gradient-text">the source of an idea</span>
      <br />
      to
      <span class="hero-gradient-text">the summit of execution.</span>
    </h3>
    <p ref="subtitleRef">{{ t('home.hero.description') }}</p>
    <div class="button-group" ref="buttonGroupRef">
      <Button icon="pi pi-file" severity="contrast" :label="t('home.hero.buttons.a')" as="router-link" to="/products" />
      <Button icon="pi pi-users" severity="contrast" :label="t('home.hero.buttons.b')" as="router-link" to="/contact" />
      <Button icon="pi pi-github" severity="contrast" :label="t('home.hero.buttons.c')" as="a" href="https://github.com/CODPEX" target="_blank" />
    </div>
    <div class="scroll-indicator">
      <span>scroll</span>
      <i class="pi pi-chevron-down"></i>
    </div>
  </div>
</template>

<style scoped>
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,70,229,0.06) 0%, transparent 70%);
}
[data-theme="dark"] .hero-content { background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.1) 0%, transparent 70%); }

.hero-bg-layer { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
.hero-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.45; }
.orb-1 { width: 600px; height: 600px; top: -15%; left: -10%; background: radial-gradient(circle, rgba(79,70,229,0.35), rgba(139,92,246,0.15) 60%, transparent 75%); animation: floatOrb1 14s ease-in-out infinite alternate; }
.orb-2 { width: 480px; height: 480px; bottom: -10%; right: -8%; background: radial-gradient(circle, rgba(236,72,153,0.25), rgba(139,92,246,0.15) 60%, transparent 75%); animation: floatOrb2 12s ease-in-out infinite alternate; }
.orb-3 { width: 360px; height: 360px; top: 35%; left: 55%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%); animation: floatOrb3 10s ease-in-out infinite alternate; }
.orb-4 { width: 260px; height: 260px; top: 60%; left: 20%; transform: translate(-50%,-50%); background: radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%); animation: floatOrb4 11s ease-in-out infinite alternate; }
[data-theme="dark"] .orb-1 { background: radial-gradient(circle, rgba(99,102,241,0.45), rgba(139,92,246,0.2) 60%, transparent 75%); }
[data-theme="dark"] .orb-2 { background: radial-gradient(circle, rgba(236,72,153,0.3), rgba(139,92,246,0.2) 60%, transparent 75%); }
[data-theme="dark"] .orb-3 { background: radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%); }
[data-theme="dark"] .orb-4 { background: radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%); }
@keyframes floatOrb1 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(80px,50px) scale(1.12)} }
@keyframes floatOrb2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-60px,-40px) scale(1.08)} }
@keyframes floatOrb3 { 0%{transform:translate(-50%,-50%) scale(1)} 100%{transform:translate(-40%,-65%) scale(1.15)} }
@keyframes floatOrb4 { 0%{transform:translate(-50%,-50%) scale(1)} 100%{transform:translate(-55%,-45%) scale(1.1)} }

.hero-content::before { content:''; position:absolute; inset:0; z-index:0; opacity:0.025; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events:none; }

/* ── Typography ── */
h3 {
  font-family: 'Long Cang', 'Ma Shan Zheng', cursive, 'DTJBT', sans-serif;
  font-size: clamp(2rem, 5.5vw, 4.8rem);
  color: var(--text-primary);
  margin: 0 0 8px;
  line-height: 1.5;
  text-align: center;
  text-shadow: 0 2px 24px rgba(79,70,229,0.12);
  position: relative;
  z-index: 1;
}
[data-theme="dark"] h3 { text-shadow: 0 2px 32px rgba(99,102,241,0.25); }

.hero-gradient-text {
  background: linear-gradient(135deg, var(--accent) 0%, #a855f7 50%, #ec4899 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 240% 240%;
  animation: gradientShift 5s ease-in-out infinite;
  filter: drop-shadow(0 0 18px rgba(168,85,247,0.35));
}
[data-theme="dark"] .hero-gradient-text { filter: drop-shadow(0 0 24px rgba(139,92,246,0.5)); }

@keyframes gradientShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

h3::after { content:''; display:block; width:80px; height:3px; margin:16px auto 0; border-radius:2px; background:linear-gradient(90deg,transparent,var(--accent),#a855f7,transparent); opacity:0.6; }

p {
  font-family: 'OS4', sans-serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin: 18px 0 0;
  padding: 0 20px;
  line-height: 1.7;
  text-align: center;
  color: var(--text-secondary);
  max-width: 640px;
  display: block;
  position: relative;
  z-index: 1;
}

/* ── Buttons ── */
.button-group {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.button-group :deep(.p-button) { border-radius: 50px; padding: 12px 28px; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.02em; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); backdrop-filter: blur(8px); border: 1px solid var(--border-color); }
.button-group :deep(.p-button:not(.p-button-text):not(.p-button-link)) { background: rgba(255,255,255,0.08); color: var(--text-primary); box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
[data-theme="dark"] .button-group :deep(.p-button:not(.p-button-text):not(.p-button-link)) { background: rgba(255,255,255,0.05); color: var(--text-primary); box-shadow: 0 2px 20px rgba(0,0,0,0.2); }
.button-group :deep(.p-button:hover:not(:disabled)) { transform: translateY(-2px); box-shadow: 0 8px 30px var(--shadow-lg) !important; border-color: var(--accent); }
[data-theme="dark"] .button-group :deep(.p-button:hover:not(:disabled)) { box-shadow: 0 8px 30px rgba(99,102,241,0.3) !important; }

/* ── Scroll Indicator ── */
.scroll-indicator { position:absolute; bottom:32px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; opacity:0.4; animation:fadeInUp 1s ease 2s both; z-index:1; }
.scroll-indicator span { font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted); font-family:'OS4',sans-serif; }
.scroll-indicator i { font-size:1rem; color:var(--text-muted); animation:scrollBounce 2s ease-in-out infinite; }
@keyframes fadeInUp { from{opacity:0;transform:translateX(-50%) translateY(12px)} to{opacity:0.4;transform:translateX(-50%) translateY(0)} }
@keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

@media (max-width: 768px) {
  .hero-content { padding: 0 20px; }
  p { font-size: 0.95rem; }
  .button-group { flex-direction: column; align-items: center; gap: 10px; }
  .button-group :deep(.p-button) { width: 100%; max-width: 240px; }
  h3::after { width: 50px; }
  .scroll-indicator { bottom: 20px; }
}
</style>
