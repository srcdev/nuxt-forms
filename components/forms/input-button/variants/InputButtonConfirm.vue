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
  >
    <template #left>
      <Icon name="material-symbols:check-circle-outline" class="icon" />
    </template>
  </InputButtonCore>
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

<style scoped lang="css">
.btn {
  &.btn-submit {
    --_border-width: var(--input-border-width-default);

    --_theme-form-border: var(--theme-form-primary-border);
    --_theme-form-outline: transparent;
    --_theme-form-bg: var(--theme-form-primary-bg);
    --_theme-form-color: var(--theme-form-primary-color);

    grid-template-columns: auto;

    background-color: var(--_theme-form-bg);
    border: var(--_border-width) solid var(--_theme-form-border);
    color: var(--_theme-form-color);
    outline: 1px solid var(--_theme-form-outline);

    &:hover,
    &:focus-visible {
      --_theme-form-color: var(--theme-form-primary-color-hover);
      --_theme-form-bg: var(--theme-form-primary-bg-hover);
      --_theme-form-border: transparent;
      --_theme-form-outline: var(--theme-form-primary-border);
    }

    &.theme-secondary {
      --_btn-theme: var(--theme-secondary);
    }
  }
}
</style>
