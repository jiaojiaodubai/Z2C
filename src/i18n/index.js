import { createI18n } from 'vue-i18n'
import messages from './massages.mjs'

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  fallbackLocale: 'en',
  messages,
})