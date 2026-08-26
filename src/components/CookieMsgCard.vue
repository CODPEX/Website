<template>
  <div class="cookie-card-overlay" v-if="showCard">
    <div class="main">
      <h1>{{ t('cookies.title') }}</h1>
      <p>
        {{ t('cookies.description') }}
      </p>
      <Button
        @click="acceptCookies"
        class="accept-button"
        icon="pi pi-check"
        :label="t('cookies.button')"
        severity="contrast"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showCard = ref(true)

const acceptCookies = () => {
  const expiryDate = new Date()
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  document.cookie = `cookiesAccepted=true; expires=${expiryDate.toUTCString()}; path=/`

  showCard.value = false
}

const checkCookieConsent = () => {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]?.trim()
    if (cookie && cookie.indexOf('cookiesAccepted=') === 0) {
      showCard.value = false
      return
    }
  }
}

checkCookieConsent()
</script>

<style lang="css" scoped>
.cookie-card-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.main {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    0 4px 30px var(--shadow-md),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid var(--nav-border);
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  text-align: center;
}

.accept-button {
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
}
</style>
