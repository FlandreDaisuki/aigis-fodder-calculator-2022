import { createApp } from 'vue';

import { install as installI18n } from './plugins/i18n';
import { install as installPinia } from './plugins/pinia';

import App from './App.vue';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

const app = createApp(App);

installPinia(app);
installI18n(app);

app.mount('#app');
