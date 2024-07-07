<template>
  <button
    :type="type"
    :data-test-id="dataTestId"
    class="btn"
    :class="[
      `btn-${type}`,
      `theme-${theme}`,
      effectClass,
      styleClassPassthrough,
    ]"
  >
    <span v-if="useEffect && effect == 'fancy'" class="fancy"></span>
    <template v-if="hasLeftContent">
      <span class="btn-icon" :class="[size, { left: theme !== 'icon-only' }]">
        <slot name="left"></slot>
      </span>
    </template>
    <span
      class="btn-text"
      :class="[size, weight, { 'sr-only': buttonTextVisuallyHidden }]"
      >{{ buttonText }}</span
    >
    <template v-if="hasRightContent">
      <span class="btn-icon" :class="[size, { right: theme !== 'icon-only' }]">
        <slot name="right"></slot>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as PropType<'submit' | 'button' | 'reset'>,
    default: 'submit',
    validator(value: string) {
      return ['button', 'cancel', 'reset', 'submit'].includes(value);
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
  buttonText: {
    type: String,
    required: true,
  },
  buttonTextVisuallyHidden: {
    type: Boolean,
    default: false,
  },
  dataTestId: {
    type: String,
    default: '',
  },
  styleClassPassthrough: {
    type: String,
    default: '',
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
});

const type = toRef(() => props.type);
const effectClass = computed(() => {
  if (props.useEffect) {
    return props.effect === 'fancy' ? '' : props.effect;
  } else {
    return '';
  }
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
</script>

<style lang="css">
.btn {
  --_padding-block: 8px;
  --_padding-inline: 12px;
  --_border-radius: 4px;

  background-color: transparent;
  display: grid;
  grid-template-rows: 1fr;
  border: none;
  border-radius: var(--_border-radius);

  font-family: var(--font-family);
  font-size: var(--font-size);

  padding-inline: var(--_padding-inline);
  padding-block: var(--_padding-block);
}
</style>
