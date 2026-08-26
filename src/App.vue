<script lang="ts" setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import CookieMsgCard from '@/components/CookieMsgCard.vue'
</script>

<template>
  <div class="app-container">
    <header class="fixed-top-header">
      <NavBar class="centered-nav" />
    </header>
    <main class="main-area">
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
    <CookieMsgCard />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
}

.fixed-top-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15px;
  background: transparent;
}

.centered-nav {
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  max-width: 1200px;
}
</style>
