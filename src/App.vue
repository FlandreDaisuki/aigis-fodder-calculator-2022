<script>
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name:'App',
  setup(props, ctx) {

    return {
      ...useI18n(),
    }
  }
})
</script>

<template>
  <h1 class="my-4 text-2xl text-center">{{ t('title') }}</h1>
</template>
