<template>
  <div class="inline-grid place-items-start px-2 py-1">
    <label
      :for="inputId"
      class="block"
    >{{ label }}</label>
    <input
      :id="inputId"
      v-model="value"
      :placeholder="placeholder"
      type="number"
      min="0"
      step="1"
      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight"
      :list="dataListId"
    >
    <datalist
      v-if="hasCandidates"
      :id="dataListId"
    >
      <option
        v-for="candidate in candidates"
        :key="candidate"
        :value="candidate"
      />
    </datalist>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watchEffect } from 'vue';

export default defineComponent({
  props: {
    inputId: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: Infinity,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    candidates: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = ref(props.modelValue);
    watchEffect(() => {
      emit('update:modelValue', value.value);
    });
    const hasCandidates = computed(() => props.candidates.length > 0);
    const dataListId = computed(() => hasCandidates.value ? `${props.inputId}-list` : '');
    return {
      value,
      hasCandidates,
      dataListId,
    };
  },
});
</script>

<style scoped>
input[type="number"].appearance-none {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
