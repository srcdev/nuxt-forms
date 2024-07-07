<template>
  <InputButtonCore
    type="submit"
    :use-effect="useEffect"
    :effect="effect"
    :data-test-id="dataTestId"
    :size
    :weight
    :button-text="buttonText"
    :style-class-passthrough="styleClassPassthrough"
    :theme
  />
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return ['small', 'normal', 'medium', 'large'].includes(value);
    },
  },
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return [
        'wght-100',
        'wght-200',
        'wght-300',
        'wght-400',
        'wght-500',
        'wght-600',
        'wght-700',
        'wght-800',
        'wght-900',
      ].includes(value);
    },
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return [
        'primary',
        'secondary',
        'tertiary',
        'text',
        'link',
        'icon-only',
        'ghost',
        'cancel',
        'confirm',
        'warning',
        'navigate-btn',
      ].includes(value);
    },
  },
  useEffect: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String as PropType<string>,
    default: 'fancy',
    validator(value: string) {
      return ['fancy', 'pulse'].includes(value);
    },
  },
  buttonText: {
    type: String,
    required: true,
  },
  dataTestId: {
    type: String,
    default: '',
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});
</script>

<style lang="css">
.btn {
  &.btn-submit {
    --_btn-theme: var(--theme-primary);
    --_border-width: var(--input-border-width-default);

    grid-template-columns: auto;
    border: var(--_border-width) solid var(--_btn-theme);
    background-color: hsl(from var(--_btn-theme) h s 75%);
    color: hsl(from var(--_btn-theme) 50% 50% 5%);

    &:hover,
    &:focus-visible {
      cursor: pointer;
      color: white;
    }

    &.theme-secondary {
      --_btn-theme: var(--theme-secondary);
    }
  }
}
</style>
