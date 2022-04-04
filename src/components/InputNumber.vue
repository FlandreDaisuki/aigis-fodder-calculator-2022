<template>
  <div class="inline-grid place-items-start px-2 py-1">
    <label
      :for="inputId"
      class="block"
    >{{ label }}</label>
    <input
      :id="inputId"
      v-model="inputValue"
      :placeholder="placeholder"
      type="number"
      :min="min"
      :max="max"
      step="1"
      class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight"
      :list="dataListId"
      @change="validateAndSubmit"
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
import { computed, defineComponent, toRef } from 'vue';

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
    min: {
      type: Number,
      default: 0,
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
    const inputValue = toRef(props, 'modelValue');
    const hasCandidates = computed(() => props.candidates.length > 0);
    const dataListId = computed(() => hasCandidates.value ? `${props.inputId}-list` : '');

    const validateAndSubmit = ($event) => {
      const n = $event.target.valueAsNumber;
      if (Number.isNaN(n) || n > props.max) {
        inputValue.value = props.max;
        emit('update:modelValue', props.max);
      } else if (n < props.min) {
        inputValue.value = props.min;
        emit('update:modelValue', props.min);
      } else {
        emit('update:modelValue', n);
      }
    };

    return {
      inputValue,
      hasCandidates,
      dataListId,
      validateAndSubmit,
    };
  },
});
</script>

<style scoped>
input[type="number"].appearance-none {
  -moz-appearance: textfield;
  appearance: textfield;
}
input[list]::-webkit-calendar-picker-indicator {
  -webkit-appearance: none;
  appearance: none;
  display: none !important;
}
</style>
