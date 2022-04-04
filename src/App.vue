<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore as useRarityStore } from './stores/rarity';
import { useStore as useFodderStore } from './stores/fodder';

import RaritySelect from './components/RaritySelect.vue';
import InputNumber from './components/InputNumber.vue';
import ResultTable from './components/ResultTable.vue';
import IcRoundExposurePlus1 from './components/IcRoundExposurePlus1.vue';
import IcRoundExposureNeg1 from './components/IcRoundExposureNeg1.vue';

export default defineComponent({
  name: 'App',
  components: {
    RaritySelect,
    InputNumber,
    ResultTable,
    IcRoundExposurePlus1,
    IcRoundExposureNeg1,
  },
  setup() {
    // const { t } = useI18n();
    const rarityStore = useRarityStore();
    const fodderStore = useFodderStore();

    const currentLevel = ref(0);
    const expToNextLevel = ref(0);
    const targetLevel = ref(1);
    const isFodderDisabled = (fodder) => {
      return Number.isInteger(fodder.rarity) && fodder.rarity !== rarityStore.rarity;
    };

    return {
      ...useI18n(),
      rarityStore,
      fodderStore,
      currentLevel,
      expToNextLevel,
      targetLevel,
      isFodderDisabled,
    };
  },
});
</script>

<template>
  <h1 class="my-4 text-2xl text-center">
    {{ t('title') }}
  </h1>
  <div class="text-center">
    <RaritySelect
      v-model="rarityStore.rarity"
      class="w-30"
    />
    <InputNumber
      v-model="currentLevel"
      class="w-30"
      input-id="current-level"
      :label="t('current-level')"
    />
    <InputNumber
      v-model="expToNextLevel"
      class="w-30"
      input-id="exp-to-next-level"
      :label="t('exp-to-next-level')"
    />
    <!-- TODO: candidates -->
    <InputNumber
      v-model="targetLevel"
      class="w-30"
      input-id="target-level"
      :label="t('target-level')"
      :candidates="[30,70,80,99]"
      :min="1"
      :max="rarityStore.maxTargetLevel"
    />
  </div>
  <hr class="my-2">
  <ResultTable
    class="mx-auto"
    :sum-of-fodder-exp="fodderStore.sumOfFodderExp"
    :current-level="currentLevel"
    :exp-to-next-level="expToNextLevel"
    :target-level="targetLevel"
  />
  <hr class="my-2">

  <fieldset class="grid grid-cols-2 gap-x-4 gap-y-2 items-center justify-center justify-items-end">
    <template
      v-for="fodder in fodderStore.sortedFodders"
      :key="fodder.id"
    >
      <label :for="fodder.id">{{ t(fodder.name) }}</label>
      <div class="inline-flex items-center space-x-2">
        <button
          class="bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-500 p-2 rounded shadow touch-action-none"
          :disabled="isFodderDisabled(fodder)"
          @click="fodderStore.decFodder(fodder)"
        >
          <IcRoundExposureNeg1 />
        </button>
        <input
          :id="fodder.id"
          v-model="fodder.count"
          class="w-20 appearance-none bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-400 px-4 py-2 rounded shadow leading-tight"
          type="number"
          :disabled="isFodderDisabled(fodder)"
        >
        <button
          class="bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-500 p-2 rounded shadow touch-action-none"
          :disabled="isFodderDisabled(fodder)"
          @click="fodderStore.incFodder(fodder)"
        >
          <IcRoundExposurePlus1 />
        </button>
      </div>
    </template>
  </fieldset>
</template>

<style scoped>
fieldset.grid-cols-2 {
  grid-template-columns: repeat(2, max-content);
}

input[type="number"].appearance-none {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
