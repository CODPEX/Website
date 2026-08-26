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
        <img
          src="@/assets/logo.svg"
          height="40"
          style="margin: 5px 25px 5px 10px; align-self: center"
          alt="Logo"
        />
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
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transform: translateY(-2px);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-weight: 600;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

.flag-icon {
  border-radius: 2px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  vertical-align: center;
}
</style>
