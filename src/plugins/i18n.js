import { createI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';

import messages from '@intlify/vite-plugin-vue-i18n/messages';

const DEFAULT_LOCALE = 'zh-TW';

export const install = (app) => {
  const storageLocale = useStorage('locale', DEFAULT_LOCALE);
  const queryLocale = new URLSearchParams(window.location.search).get('locale');
  if (queryLocale) {
    storageLocale.value = queryLocale;
  }

  return app.use(createI18n({
    locale: storageLocale.value,
    fallbackLocale: {
      zh: ['zh-TW'],
      default: DEFAULT_LOCALE,
    },
    messages,
  }));
};
