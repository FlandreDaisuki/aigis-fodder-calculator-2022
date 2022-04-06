<template>
  <div class="inline-grid place-items-start px-2 py-1">
    <label
      :for="inputId"
      class="block"
    >{{ label }}</label>
    <input
      :id="inputId"
      v-model="inputValue"
      type="checkbox"
      class="hidden"
      @change="submit"
    >
    <label
      :for="inputId"
      class="select-none block w-6 h-6 mx-auto bg-white border border-gray-400 hover:border-gray-500 rounded shadow"
    >
      <i
        v-show="inputValue"
        class="i-ic-round-check h-full w-full"
      />
    </label>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputCheckbox',
  props: {
    inputId: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    const submit = () => {
      emit('update:modelValue', inputValue.value);
    };

    return {
      inputValue,
      submit,
    };
  },
});
</script>
