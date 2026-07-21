import './assets/app.css'
// vue
import { createApp } from 'vue'
import App from './App.vue'
// router
import router from './routes'
// i18n
import { createI18n } from 'vue-i18n'
import enUS from './locales/en-US.json'
import esES from './locales/es-ES.json'
// pinia
import { createPinia } from 'pinia'
// ui
import ui from '@nuxt/ui/vue-plugin'

// import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'es-ES': esES
  }
})

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(i18n)
  .use(pinia)
  .use(ui)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
