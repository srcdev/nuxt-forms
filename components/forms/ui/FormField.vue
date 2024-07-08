<template>
  <div
    class="form-field"
    :class="[width, styleClassPassthrough, { 'has-gutter': hasGutter }]"
  >
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
  hasGutter: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});
</script>

<style lang="css">
.form-field {
  --_gutter-width: 0px;
  --_max-width: 400px;

  margin-inline: auto;
  margin-bottom: 16px;

  width: min(100% - calc(2 * var(--_gutter-width)), var(--_max-width));
  outline: 0px solid var(--gray-5);

  &.has-gutter {
    --_gutter-width: 16px;
  }

  &.narrow {
    max-width: 400px;
  }

  &.medium {
    --_max-width: 800px;
  }

  &.wide {
    --_max-width: 1200px;
  }
}
</style>
