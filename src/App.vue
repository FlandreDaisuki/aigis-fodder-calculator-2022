<script>
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStorage, useTitle } from '@vueuse/core';
import { useStore as useRarityStore } from './stores/rarity';
import { useStore as useFodderStore } from './stores/fodder';

import RaritySelect from './components/RaritySelect.vue';
import InputNumber from './components/InputNumber.vue';
import InputCheckbox from './components/InputCheckbox.vue';
import ResultTable from './components/ResultTable.vue';
import AppDialog from './components/AppDialog.vue';

export default defineComponent({
  name: 'App',
  components: {
    RaritySelect,
    InputNumber,
    InputCheckbox,
    ResultTable,
    AppDialog,
  },
  setup() {
    const { t } = useI18n();
    useTitle(t('title'));

    const rarityStore = useRarityStore();
    const fodderStore = useFodderStore();

    const currentLevel = ref(0);
    const expToNextLevel = ref(0);

    const targetLevel = ref(rarityStore.maxTargetLevel);
    watch(() => rarityStore.rarity, () => {
      targetLevel.value = rarityStore.maxTargetLevel;
      fodderStore.resetCountByRarity(rarityStore.rarity);
    });

    const hasBonus = useStorage('has-bonus', false);
    const shouldHideDisabledFodders = useStorage('should-hide-disabled-fodders', false);
    const isFodderDisabled = (fodder) => {
      return Number.isInteger(fodder.rarity) && fodder.rarity !== rarityStore.rarity;
    };

    const isCustomFodderDialogShown = ref(false);
    const addCustomFodder = (fodder) => {
      isCustomFodderDialogShown.value = false;

      const name = String(fodder?.name ?? '').trim();
      if (!name) { return; }

      const exp = Number(fodder?.exp);
      if (Number.isNaN(exp) || !Number.isFinite(exp) || !Number.isSafeInteger(exp)) { return; }
      if (exp < 0) { return; }

      fodderStore.appendCustomFodder({ name, exp });
    };

    const isCustomFodder = (fodder) => Boolean(fodder.nameDisplay);

    return {
      ...useI18n(),
      rarityStore,
      fodderStore,
      currentLevel,
      expToNextLevel,
      targetLevel,
      hasBonus,
      shouldHideDisabledFodders,
      isFodderDisabled,
      isCustomFodderDialogShown,
      addCustomFodder,
      isCustomFodder,
    };
  },
});
</script>

<template>
  <hgroup>
    <h1 class="my-4 text-2xl text-center">
      {{ t('title') }}
    </h1>
    <h2 class="text-right">{{ t('secondary-title') }}</h2>
  </hgroup>


  <div class="text-center">
    <RaritySelect
      v-model="rarityStore.rarity"
      class="w-35"
    />
    <InputNumber
      v-model="currentLevel"
      class="w-30"
      input-id="current-level"
      :label="t('current-level')"
    />
    <InputNumber
      v-model="expToNextLevel"
      class="w-36"
      input-id="exp-to-next-level"
      :label="t('exp-to-next-level')"
    />
    <InputNumber
      v-model="targetLevel"
      class="w-30"
      input-id="target-level"
      :label="t('target-level')"
      :candidates="rarityStore.candidateLevels"
      :min="1"
      :max="rarityStore.maxTargetLevel"
    />
    <InputCheckbox
      v-model="hasBonus"
      input-id="bonus-sprite"
      :label="t('bonus-sprite')"
    />
    <InputCheckbox
      v-model="shouldHideDisabledFodders"
      input-id="hide-disabled-fodder"
      :label="t('hide-disabled-fodder')"
    />
  </div>
  <hr class="my-2">
  <ResultTable
    class="mx-auto"
    :has-bonus="hasBonus"
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
      <template v-if="!shouldHideDisabledFodders || !isFodderDisabled(fodder)">
        <label
          :for="fodder.id"
          class="inline-flex"
        >
          <i
            v-if="isCustomFodder(fodder)"
            class="i-mdi-trash-can h-6 w-6 mr-4 text-red-500 hover:text-red-400 hover:cursor-pointer select-none"
            @click="fodderStore.removeCustomFodder(fodder)"
          />
          <span>{{ fodder.nameDisplay ?? t(fodder.name) }} ({{ fodder.exp }})</span>
        </label>
        <div class="inline-flex items-center space-x-2">
          <button
            class="inline-flex bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-500 p-2 rounded shadow touch-action-none select-none"
            :disabled="isFodderDisabled(fodder)"
            @click="fodderStore.decFodder(fodder)"
          >
            <i class="i-ic-round-exposure-neg-1 select-none" />
          </button>
          <input
            :id="fodder.id"
            v-model="fodder.count"
            class="w-20 appearance-none bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-400 px-4 py-2 rounded shadow leading-tight"
            type="number"
            min="0"
            :disabled="isFodderDisabled(fodder)"
          >
          <button
            class="inline-flex bg-white border border-gray-400 enabled:hover:border-gray-500 disabled:text-gray-500 p-2 rounded shadow touch-action-none select-none"
            :disabled="isFodderDisabled(fodder)"
            @click="fodderStore.incFodder(fodder)"
          >
            <i class="i-ic-round-exposure-plus-1 select-none" />
          </button>
        </div>
      </template>
    </template>
    <button
      class="col-span-2 px-4 py-2 mx-auto bg-blue-200 rounded shadow"
      @click="isCustomFodderDialogShown = true"
    >
      {{ t('add-custom-fodder') }}
    </button>
  </fieldset>

  <AppDialog
    ref="customFodderDialogEl"
    v-model="isCustomFodderDialogShown"
    @submit="addCustomFodder"
    @cancel="isCustomFodderDialogShown = false"
  >
    <div>
      <label for="custom-fodder-dialog-fodder-name">{{ t('dialog.custom-fodder.name') }}</label>
      <input
        id="custom-fodder-dialog-fodder-name"
        class="appearance-none w-40 bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight"
        type="text"
        name="name"
      >
    </div>
    <div class="mt-2">
      <label for="custom-fodder-dialog-fodder-exp">{{ t('dialog.custom-fodder.exp') }}</label>
      <input
        id="custom-fodder-dialog-fodder-exp"
        class="appearance-none w-40 bg-white border border-gray-400 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight"
        type="number"
        name="exp"
        min="0"
        step="1"
      >
    </div>
  </AppDialog>
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
