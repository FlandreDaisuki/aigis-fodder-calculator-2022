<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore as useRarityStore } from './stores/rarity';

import RaritySelect from './components/RaritySelect.vue';
import InputNumber from './components/InputNumber.vue';
import ResultTable from './components/ResultTable.vue';

export default defineComponent({
  name: 'App',
  components: {
    RaritySelect,
    InputNumber,
    ResultTable,
  },
  setup() {
    // const { t } = useI18n();
    const rarityStore = useRarityStore();

    const currentLevel = ref(0);
    const expToNextLevel = ref(0);
    const targetLevel = ref(1);

    return {
      ...useI18n(),
      rarityStore,
      currentLevel,
      expToNextLevel,
      targetLevel,
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
    :current-level="currentLevel"
    :exp-to-next-level="expToNextLevel"
    :target-level="targetLevel"
  />
  <div>{{ rarityStore.rarity }}</div>
  <div>{{ currentLevel }}</div>
  <div>{{ expToNextLevel }}</div>
  <div>{{ targetLevel }}</div>
</template>
