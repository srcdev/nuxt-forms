<template>
  <button
    :type
    :readonly
    :aria-disabled="readonly"
    :data-testid="dataTestid"
    :data-btn-theme="theme"
    :data-size="size"
    class="input-button-core"
    :class="[`btn-${type}`, effectClass, elementClasses, { 'icon-only': isIconOnly }]"
  >
    <span v-if="useEffect && effect == 'fancy'" class="fancy"></span>
    <template v-if="hasLeftContent && !isIconOnly">
      <span class="btn-icon left">
        <slot name="left"></slot>
      </span>
    </template>
    <span class="btn-text" :class="[weight, { 'sr-only': isIconOnly }]">{{ buttonText }}</span>
    <template v-if="hasRightContent && !isIconOnly">
      <span class="btn-icon right">
        <slot name="right"></slot>
      </span>
    </template>
    <template v-if="isIconOnly">
      <span class="btn-icon icon-only">
        <slot name="iconOnly"></slot>
      </span>
    </template>
  </button>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
  size: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return propValidators.weight.includes(value);
    },
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  type: {
    type: String as PropType<'submit' | 'button' | 'reset'>,
    default: 'button',
    validator(value: string) {
      return propValidators.inputTypesButton.includes(value);
    },
  },
  buttonText: {
    type: String,
    required: true,
  },
  dataTestid: {
    type: String,
    default: '',
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
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
  isPending: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
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
const isIconOnly = computed(() => slots.iconOnly !== undefined);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.input-button-core {
  align-items: center;
  display: flex;
  gap: var(--form-button-icon-gap);
  justify-content: center;
  border: none;
  border-radius: var(--form-input-border-radius);
  font-family: var(--font-family);

  padding-inline: var(--form-button-padding-inline);
  padding-block-start: var(--form-element-padding-block-start);
  padding-block-end: var(--form-element-padding-block-end);

  transition: all 0.2s ease-in-out;

  background-color: var(--theme-btn-bg);
  border: var(--form-element-border-width) solid var(--theme-btn-border);
  color: var(--theme-btn-text);
  outline: var(--form-element-outline-width) solid var(--theme-btn-outline);

  /*
  * States
  **/
  &:hover {
    --theme-btn-bg: var(--theme-btn-bg-hover);
    --theme-btn-border: var(--theme-btn-border-hover);
    --theme-btn-text: var(--theme-btn-text-hover);
    --theme-btn-outline: var(--theme-btn-outline-hover);
  }

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    --theme-btn-bg: var(--theme-btn-bg-focus);
    --theme-btn-border: var(--theme-btn-border-focus);
    --theme-btn-text: var(--theme-btn-text-focus);
    --theme-btn-outline: var(--theme-btn-outline-focus);
    box-shadow: var(--form-focus-box-shadow);
  }

  &[readonly] {
    opacity: 0.5;
    &:hover,
    &:focus-visible {
      cursor: not-allowed;
    }
  }

  &.icon-only {
    aspect-ratio: 1;
    height: var(--form-icon-only-button-size);
    width: var(--form-icon-only-button-size);
    margin: 0 !important;
    padding: 0 !important;
  }

  .btn-text {
    display: inline-block;
    white-space: nowrap;
    font-size: var(--form-element-font-size);
    line-height: var(--form-element-line-height);
  }

  .btn-icon {
    display: flex;
    .icon {
      aspect-ratio: 1;
      display: inline-block;
      height: var(--form-icon-size);
      width: var(--form-icon-size);
    }
  }
}
</style>
