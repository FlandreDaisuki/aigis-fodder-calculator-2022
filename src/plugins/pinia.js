import { createPinia } from 'pinia';

export const install = (app) => {
  return app.use(createPinia());
};
