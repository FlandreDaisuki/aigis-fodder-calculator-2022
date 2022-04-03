<template>
  <div class="inline-grid place-items-start px-2 py-1">
    <label for="rarity-select">{{ t('rarity-select') }}</label>
    <div class="relative">
      <select
        id="rarity-select"
        v-model="rarity"
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 pr-8 rounded shadow leading-tight"
      >
        <option
          v-for="option in rarityOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <IcRoundKeyboardArrowDown
          class="h-6 w-6 text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

import IcRoundKeyboardArrowDown from './IcRoundKeyboardArrowDown.vue';
import { useStore as useRarityStore } from '../stores/rarity';

export default defineComponent({
  name: 'RaritySelect',
  components: {
    IcRoundKeyboardArrowDown,
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { rarityOptions } = useRarityStore();

    const rarity = ref(props.modelValue);
    watchEffect(() => {
      emit('update:modelValue', rarity.value);
    });

    return {
      ...useI18n(),
      rarityOptions,
      rarity,
    };
  },
});
</script>
