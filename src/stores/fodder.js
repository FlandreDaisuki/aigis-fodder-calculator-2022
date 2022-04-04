import { defineStore } from 'pinia';
// import { useI18n } from 'vue-i18n';
import FODDER_EXP_TABLE from '../constants/fodder-exp-table';

const hash = (text) => [...btoa(String(text))]
  .map((c, i) => c.charCodeAt(0) * (i + 3))
  .reduce((a, b) => a * b, 1)
  .toString(16)
  .replace(/0*$/, '')
  .replace(/^\d/, (c) => String.fromCharCode(0x61 /* 'a' */+ Number(c)));


export const useStore = defineStore('fodder', {
  state: () => ({
    fodders: Object.values(FODDER_EXP_TABLE).map((fodder) => ({
      id: hash(fodder.name),
      ...fodder,
      count: 0,
    })),
  }),
  getters: {
    sortedFodders: (state) => {
      return state.fodders.sort((a, b) => a.exp - b.exp);
    },

    sumOfFodderExp: (state) => {
      return state.fodders.reduce((sum, fodder) => sum + fodder.exp * fodder.count, 0);
    },
  },
  actions: {
    appendCustomFodder(fodderLike) {
      const fodder = {
        id: hash(fodderLike.name),
        ...fodderLike,
        count: 0,
      };
      this.fodders.push(fodder);
    },
    incFodder(fodder) {
      const found = this.fodders.find((f) => f.id === fodder.id);
      if (found) {
        found.count += 1;
      }
    },
    decFodder(fodder) {
      const found = this.fodders.find((f) => f.id === fodder.id);
      if (found) {
        found.count = Math.max(0, found.count - 1);
      }
    },
  },
});
