<template>
  <dialog
    ref="dialogEl"
    class="fixed m-auto inset-0 z-50 bg-white rounded-lg shadow-lg p-4"
  >
    <form
      ref="formEl"
      method="dialog"
      name="custom-fodder-form"
      class="space-y-4"
      @submit="submit"
    >
      <header>
        <slot name="header" />
      </header>

      <main>
        <slot />
      </main>

      <footer class="flex justify-end gap-2">
        <button
          type="button"
          class="px-2 py-0.5 bg-gray-200 rounded shadow"
          @click="cancel"
        >
          {{ t('cancel') }}
        </button>
        <button
          type="button"
          class="px-2 py-0.5 bg-blue-200 rounded shadow"
          @click="submit"
        >
          {{ t('submit') }}
        </button>
      </footer>
    </form>
  </dialog>
</template>

<script>
import { defineComponent, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'AppDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formEl = ref(null);
    const dialogEl = ref(null);

    watchEffect(() => {
      if (props.modelValue) {
        dialogEl.value?.showModal();
      } else {
        dialogEl.value?.close();
      }
    });

    return {
      ...useI18n(),
      formEl,
      dialogEl,
      submit: () => {
        emit('submit', {
          name: formEl.value?.elements?.['name']?.value,
          exp: formEl.value?.elements?.['exp']?.valueAsNumber,
        });
      },
      cancel: () => emit('cancel'),
    };
  },
});
</script>
