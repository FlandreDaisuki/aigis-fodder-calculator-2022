import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useStore = defineStore('rarity', {
  state: () => ({
    rarity: 3,
  }),
  getters: {
    rarityOptions: () => {
      const { t } = useI18n();

      return [{
        text: t('rarity.iron'),
        value: 1,
      }, {
        text: t('rarity.bronze'),
        value: 2,
      }, {
        text: t('rarity.silver'),
        value: 3,
      }, {
        text: t('rarity.gold'),
        value: 4,
      }, {
        text: t('rarity.platinum'),
        value: 5,
      }, {
        text: t('rarity.black'),
        value: 6,
      }];
    },
    maxTargetLevel: (state) => {
      return [
        30,
        40,
        55,
        99,
        99,
        99,
      ][state.rarity - 1];
    },
    rarityName: (state) => {
      return [
        'iron',
        'bronze',
        'silver',
        'gold',
        'platinum',
        'black',
      ][state.rarity - 1];
    },
  },
});
