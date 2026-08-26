<template>
  <div class="navbar-container">
    <!-- 
    <div class="message-container">
      <Message severity="error" closable>
        春节佳节，祥瑞盈门。愿君岁岁安康，似 “四时无疾疫，安息悦晨昏”；更祝新岁财源如
        春潮带雨晚来急，野渡无人舟自横” 般不期而至、充盈流转，阖府同沐春晖。 Aurora
        祝你新的一年财源滚滚、学业进步、事业有成！</Message
      >
      <Message style="margin-top: 1px" severity="info" icon="pi pi-info" closable>
        <b>帮助我们国际化！</b>
        如你所见，我们现在的语言均为机翻，存在大量语法错误和用词不当，欢迎各位语言专家帮助我们一同实现国际化！<br /><b
          >Help us translate!</b
        >
        As you can see, our current texts are all machine-translated, containing many grammatical
        errors and improper word usage. We welcome language experts to help us achieve
        internationalization together!</Message
      >
    </div>
    -->
    <Menubar :model="items" class="navbar-blur">
      <template #start>
        <ThemeToggle />
        <!-- SVG Logo with theme-aware fill color -->
        <svg
          height="40"
          style="margin: 5px 25px 5px 10px; align-self: center"
          viewBox="0 0 152.1 192.6"
          xmlns="http://www.w3.org/2000/svg"
          alt="Logo"
        >
          <g id="logo-paths">
            <path d="M11.6,40.8c3.5-2,6.9-4.1,10.3-6C40.8,23.8,59.7,13,78.6,2C83-0.6,87-0.7,91.4,1.9c18.3,10.7,36.7,21.3,55.1,31.9
            c6.5,3.8,7.4,10.4,2.1,15.8c-4.6,4.7-9.3,9.3-14,14c-4,3.9-7.8,4.5-12.7,1.7c-10.5-6-20.8-12.2-31.4-18C80,41.4,68.5,37.6,56.4,36
            c-14.9-2-29.4-0.3-43.5,4.8c-0.3,0.1-0.6,0.2-1,0.2C12,41.1,11.9,41,11.6,40.8z" />
            <path d="M12.7,152.4c7.3,1.9,14.4,3.8,21.7,4.5c12.9,1.4,25.6,0,38-3.7c10.2-3.1,19.4-8.2,28.6-13.6c6.8-4,13.5-7.9,20.3-11.8
            c5.5-3.2,9.4-2.6,13.9,1.9c4.2,4.2,8.3,8.7,12.8,12.7c5.2,4.7,5.2,12.7-2.3,16.9c-18.5,10.3-36.7,21.1-54.9,31.7
            c-3.9,2.3-7.6,2.2-11.5-0.1c-21.2-12.3-42.4-24.5-63.6-36.7C14.6,153.7,13.7,153,12.7,152.4z" />
            <path d="M44.5,154.5c-13.8-0.4-26.9-3.2-39.2-9.4c-1.6-0.8-2.1-1.6-1.8-3.5c3.8-22.7,12.1-43.2,28.3-60c1.8-1.8,3.8-3.5,5.7-5.2
            c0.5-0.4,1-1.1,1.7-0.8c0.8,0.3,0.5,1.2,0.5,1.8c0.4,12.9,3.6,25.1,9.7,36.6c6.8,12.8,16.4,23,28.6,30.7c0.3,0.2,0.7,0.4,1.1,0.6
            c1.6,0.9,1.4,1.6-0.3,2.2c-6.1,2.4-12.4,4.3-18.9,5.4C54.8,153.8,49.5,154.3,44.5,154.5z" />
            <path d="M0.4,138.1c-0.6-0.8-0.3-1.8-0.3-2.6c0-26.7,0-53.3-0.1-80c0-3.8,1-6,4.6-7.7c23.9-11.5,48.2-12.4,72.9-3.1
            c0.3,0.1,0.6,0.2,0.9,0.4c0.6,0.3,1.7,0.4,1.7,1.2s-1,1-1.6,1.4c-10.8,6.3-21.7,12.5-32.4,18.8C32.2,74.6,21.9,86.3,14,100.3
            c-6.3,11.3-10.4,23.4-12.8,36.1c-0.1,0.5-0.2,1-0.4,1.4C0.8,137.9,0.6,137.9,0.4,138.1z" />
          </g>
        </svg>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <router-link
          v-if="item.route"
          v-ripple
          :to="item.route"
          class="flex items-center router-link"
          active-class="router-link-active"
          v-bind="props.action"
        >
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </router-link>
        <a v-else v-ripple class="flex items-center" v-bind="props.action">
          <span>{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i
            v-if="hasSubmenu"
            :class="[
              'pi pi-angle-down ml-auto',
              { 'pi-angle-down': root, 'pi-angle-right': !root },
            ]"
          ></i>
        </a>
      </template>
      <template #end>
        <Select
          v-model="selectedLanguage"
          :options="languages"
          optionLabel="name"
          placeholder="Select a Language"
          class="w-full md:w-56"
          style="background-color: transparent"
          @change="changeLanguage"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <img
                :alt="slotProps.value.name"
                :src="getFlagUrl(slotProps.value.code)"
                class="mr-2 flag-icon"
                style="width: 18px; height: 12px; object-fit: cover; margin-right: -10px"
              />
            </div>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <img
                :alt="slotProps.option.name"
                :src="getFlagUrl(slotProps.option.code)"
                class="mr-2 flag-icon"
                style="width: 18px; height: 12px; object-fit: cover"
              />
              <span style="margin-left: 8px">{{ slotProps.option.name }}</span>
            </div>
          </template>
        </Select>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import ThemeToggle from '@/components/ThemeToggle.vue'

// 用于检测当前主题，控制 logo 颜色
const isDark = computed(() => document.documentElement.getAttribute('data-theme') === 'dark')

const { t, locale } = useI18n()

const items = computed(() => [
  {
    label: t('nav.home'),
    route: '/',
  },
  {
    label: t('nav.products'),
    route: '/products',
  },
  {
    label: t('nav.about'),
    route: '/about',
  },
  {
    label: t('nav.contact'),
    route: '/contact',
  },
  {
    label: t('nav.docs'),
    route: '/docs',
  },
])

const selectedLanguage = ref()
const languages = ref([
  { name: 'English (USA)', code: 'en' },
  { name: '简体中文 (PRC)', code: 'zh' },
])

const getFlagUrl = (code) => {
  const flagMap = {
    en: 'https://flagcdn.com/w40/us.png',
    zh: 'https://flagcdn.com/w40/cn.png',
  }
  return flagMap[code] || 'https://flagcdn.com/w40/us.png'
}

const changeLanguage = (event) => {
  locale.value = event.value.code
  selectedLanguage.value = event.value
  Cookies.set('language', event.value.code, { expires: 365 })
}

onMounted(() => {
  const savedLanguage = Cookies.get('language')
  if (savedLanguage) {
    locale.value = savedLanguage
    selectedLanguage.value = languages.value.find((lang) => lang.code === savedLanguage)
  } else {
    selectedLanguage.value = languages.value.find((lang) => lang.code === locale.value)
  }
})
</script>

<style scoped>
.navbar-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--text-primary);
}

.navbar-blur {
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid var(--nav-border);
  border-radius: 12px;
  margin: 10px;
  z-index: 1000;
}

[data-theme="dark"] .navbar-blur {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.message-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.router-link {
  text-decoration: none;
  color: inherit;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.router-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.router-link:hover::before {
  transform: translateX(100%);
}

.router-link:hover {
  background-color: rgba(79, 70, 229, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transform: translateY(-2px);
}

[data-theme="dark"] .router-link:hover {
  background-color: rgba(129, 140, 248, 0.12);
}

.router-link-active {
  background-color: rgba(79, 70, 229, 0.12);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-weight: 600;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .router-link-active {
  background-color: rgba(129, 140, 248, 0.2);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.flag-icon {
  border-radius: 2px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  vertical-align: center;
}

/* SVG Logo theme-aware fill */
#logo-paths path {
  fill: var(--text-primary);
  transition: fill var(--transition-speed) ease;
}
</style>
