<template>
  <div class="form-wrapper" :class="width">
    <h1>FormWrapper.vue</h1>
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String as PropType<string>,
    default: 'narrow',
    validator: (val: string) => ['narrow', 'medium', 'wide'].includes(val),
  },
});
</script>

<style lang="css">
.form-wrapper {
  outline: 1px solid var(--gray-12);

  &.narrow {
    max-width: 400px;
  }

  &.medium {
    max-width: 800px;
  }

  &.wide {
    max-width: 1200px;
  }
}
</style>
