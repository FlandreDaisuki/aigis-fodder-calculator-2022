<script>
import { defineComponent } from "vue";

export default defineComponent({
  name:'App',
  setup(props, ctx) {
    return {
      greetings: 'Hello'
    }
  }
})
</script>

<template>
  <h1>{{ greetings }}</h1>
</template>
