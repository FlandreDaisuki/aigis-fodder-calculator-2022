import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
// import { useI18n } from 'vue-i18n';
import FODDER_EXP_TABLE from '../constants/fodder-exp-table';

/** https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings */
const toBinary = (text) => {
  const codeUnits = new Uint16Array(text.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = text.charCodeAt(i);
  }
  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = '';
  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
};

const hash = (text) => [...btoa(toBinary(text))]
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
    customFodders: useStorage('custom-fodders', [], void 0, {
      serializer: {
        read: (v) => (v ? JSON.parse(v) : []).map((fodder) => Object.assign(fodder, { count: 0 })),
        write: (v) => JSON.stringify(v),
      },
    }),
  }),
  getters: {
    sortedFodders: (state) => {
      return state.fodders.concat(state.customFodders).sort((a, b) => a.exp - b.exp);
    },

    sumOfFodderExp() {
      return this.sortedFodders.reduce((sum, fodder) => sum + fodder.exp * fodder.count, 0);
    },
  },
  actions: {
    appendCustomFodder({ name, exp }) {
      const fodder = {
        id: hash(name),
        exp,
        nameDisplay: name,
        count: 0,
      };
      this.customFodders.push(fodder);
    },
    incFodder(fodder) {
      const found = this.sortedFodders.find((f) => f.id === fodder.id);
      if (found) {
        found.count += 1;
      }
    },
    decFodder(fodder) {
      const found = this.sortedFodders.find((f) => f.id === fodder.id);
      if (found) {
        found.count = Math.max(0, found.count - 1);
      }
    },
  },
});
