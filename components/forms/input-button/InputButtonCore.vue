<template>
  <button
    :type
    :readonly
    :aria-disabled="readonly"
    :data-test-id="dataTestId"
    :data-btn-theme="theme"
    class="input-button-core btn"
    :class="[`btn-${type}`, size, effectClass, styleClassPassthrough, { 'icon-only': isIconOnly }]"
  >
    <span v-if="useEffect && effect == 'fancy'" class="fancy"></span>
    <template v-if="hasLeftContent && !isIconOnly">
      <span class="btn-icon left" :class="[size]">
        <slot name="left"></slot>
      </span>
    </template>
    <span class="btn-text" :class="[size, weight, { 'sr-only': isIconOnly }]">{{ buttonText }}</span>
    <template v-if="hasRightContent && !isIconOnly">
      <span class="btn-icon right">
        <slot name="right"></slot>
      </span>
    </template>
    <template v-if="isIconOnly">
      <span class="btn-icon icon-only" :class="[size]">
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
</script>

<style lang="css">
.btn {
  --_padding-block: var(--theme-form-button-padding-block-normal);
  --_padding-inline: var(--theme-form-button-padding-inline-normal);
  --_icon-gap: var(--theme-form-button-icon-gap-normal);
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);

  align-items: center;
  display: flex;
  gap: var(--_icon-gap);
  justify-content: center;
  border: none;
  border-radius: var(--input-border-radius);
  font-family: var(--font-family);

  padding-inline: var(--_padding-inline);
  padding-block: var(--_padding-block);

  transition: all 0.2s ease-in-out;

  background-color: var(--theme-btn-bg);
  border: var(--_border-width) solid var(--theme-btn-border);
  color: var(--theme-btn-text);
  outline: 1px solid var(--theme-btn-outline);

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
    box-shadow: var(--theme-form-focus-box-shadow);
  }

  &[readonly] {
    opacity: 0.5;
    &:hover,
    &:focus-visible {
      cursor: not-allowed;
    }
  }

  &.x-small {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-x-small);
      --_icon-gap: var(--theme-form-button-icon-gap-x-small);
    }
    &.icon-only {
      --_padding-block: var(--theme-form-button-padding-block-icon-only-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-icon-only-x-small);
    }
  }

  &.small {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-small);
      --_icon-gap: var(--theme-form-button-icon-gap-small);
    }
    &.icon-only {
      --_padding-block: var(--theme-form-button-padding-block-icon-only-small);
      --_padding-inline: var(--theme-form-button-padding-inline-icon-only-small);
    }
  }
  &.normal {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-normal);
      --_icon-gap: var(--theme-form-button-icon-gap-normal);
    }
    &.icon-only {
      --_padding-block: var(--theme-form-button-padding-block-icon-only-normal);
      --_padding-inline: var(--theme-form-button-padding-inline-icon-only-normal);
    }
  }
  &.medium {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-medium);
      --_icon-gap: var(--theme-form-button-icon-gap-medium);
    }
    &.icon-only {
      --_padding-block: var(--theme-form-button-padding-block-icon-only-medium);
      --_padding-inline: var(--theme-form-button-padding-inline-icon-only-medium);
    }
  }

  &.large {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-large);
      --_icon-gap: var(--theme-form-button-icon-gap-large);
    }
    &.icon-only {
      --_padding-block: var(--theme-form-button-padding-block-icon-only-large);
      --_padding-inline: var(--theme-form-button-padding-inline-icon-only-large);
    }
  }

  .btn-text {
    &.small {
      font-size: var(--theme-form-button-font-size-small);
    }
    &.normal {
      font-size: var(--theme-form-button-font-size-normal);
    }
    &.medium {
      font-size: var(--theme-form-button-font-size-medium);
    }

    &.large {
      font-size: var(--theme-form-button-font-size-large);
    }

    &.sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      height: 1px;
      width: 1px;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .btn-icon {
    display: flex;
    .icon {
      aspect-ratio: 1;
      display: inline-block;
    }

    &.x-small {
      .icon {
        height: var(--theme-form-button-icon-size-small);
        width: var(--theme-form-button-icon-size-small);
      }
    }
    &.small {
      .icon {
        height: var(--theme-form-button-icon-size-small);
        width: var(--theme-form-button-icon-size-small);
      }
    }
    &.normal {
      .icon {
        height: var(--theme-form-button-icon-size-normal);
        width: var(--theme-form-button-icon-size-normal);
      }
    }
    &.medium {
      .icon {
        height: var(--theme-form-button-icon-size-medium);
        width: var(--theme-form-button-icon-size-medium);
      }
    }

    &.large {
      .icon {
        height: var(--theme-form-button-icon-size-large);
        width: var(--theme-form-button-icon-size-large);
      }
    }
  }
}
</style>
