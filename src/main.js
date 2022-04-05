import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';

import messages from '@intlify/vite-plugin-vue-i18n/messages';

import App from './App.vue';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

const app = createApp(App);
app
  .use(createPinia())
  .use(createI18n({
    locale: 'zh-TW',
    messages,
  })).mount('#app');