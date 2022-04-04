<template>
  <table class="text-center text-sm sm:text-base">
    <thead>
      <tr>
        <th> {{ t('table.exp-to-target-level') }}</th>
        <th />
        <th>{{ t('table.fodder-exp') }}</th>
        <th /><th>{{ t('table.fodder-bonus') }}</th>
        <th />
        <th>{{ t('table.fodder-exp-to-target-level') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ expToTargetLevel }}</td>
        <td>- (</td>
        <td>{{ sumOfFodderExp }}</td>
        <td>×</td>
        <td>{{ hasBonus ? 1.1 : 1 }}</td>
        <td>) =</td>
        <td>{{ restExpToTargetLevel }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore as useRarityStore } from '../stores/rarity';
import RARITY_EXP_TABLE from '../constants/rarity-exp-table';

export default defineComponent({
  props: {
    currentLevel: {
      type: Number,
      default: 0,
    },
    expToNextLevel: {
      type: Number,
      default: 0,
    },
    targetLevel: {
      type: Number,
      default: 1,
    },
    hasBonus: {
      type: Boolean,
      default: false,
    },
    sumOfFodderExp: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const rarityStore = useRarityStore();

    const currentRarityExpTable = computed(() => RARITY_EXP_TABLE[rarityStore.rarityName]);
    const currentExp = computed(() => {
      return currentRarityExpTable.value[props.currentLevel] - props.expToNextLevel;
    });
    const targetLevelExp = computed(() => {
      return currentRarityExpTable.value[props.targetLevel - 1];
    });
    const expToTargetLevel = computed(() => {
      return targetLevelExp.value - currentExp.value;
    });
    const restExpToTargetLevel = computed(() => {
      const fodderExp = props.sumOfFodderExp * (props.hasBonus ? 1.1 : 1);
      return expToTargetLevel.value - fodderExp;
    });

    return {
      ...useI18n(),
      currentExp,
      targetLevelExp,
      expToTargetLevel,
      restExpToTargetLevel,
    };
  },
});
</script>
