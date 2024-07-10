<template>
  <button
    :type="type"
    :data-test-id="dataTestId"
    class="btn"
    :class="[
      `btn-${type}`,
      `theme-${theme}`,
      size,
      effectClass,
      styleClassPassthrough,
      { 'icon-only': isIconOnly },
    ]"
  >
    <span v-if="useEffect && effect == 'fancy'" class="fancy"></span>
    <template v-if="hasLeftContent && !isIconOnly">
      <span class="btn-icon left" :class="[size]">
        <slot name="left"></slot>
      </span>
    </template>
    <span class="btn-text" :class="[size, weight, { 'sr-only': isIconOnly }]">{{
      buttonText
    }}</span>
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
      return ['x-small', 'small', 'normal', 'medium', 'large'].includes(value);
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
const isIconOnly = computed(() => slots.iconOnly !== undefined);
</script>

<style lang="css">
.btn {
  --_padding-block: var(--theme-form-button-padding-block-normal);
  --_padding-inline: var(--theme-form-button-padding-inline-normal);
  --_border-radius: 4px;
  --_icon-gap: var(--theme-form-button-icon-gap-normal);

  align-items: center;
  display: flex;
  gap: var(--_icon-gap);
  justify-content: center;
  border: none;
  border-radius: var(--_border-radius);

  font-family: var(--font-family);

  padding-inline: var(--_padding-inline);
  padding-block: var(--_padding-block);

  &:hover,
  &:focus-visible {
    cursor: pointer;
  }

  &.x-small {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-x-small);
      --_icon-gap: var(--theme-form-button-icon-gap-x-small);
    }
  }

  &.small {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-small);
      --_icon-gap: var(--theme-form-button-icon-gap-small);
    }
  }
  &.normal {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-normal);
      --_icon-gap: var(--theme-form-button-icon-gap-normal);
    }
  }
  &.medium {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-medium);
      --_icon-gap: var(--theme-form-button-icon-gap-medium);
    }
  }

  &.large {
    &:not(.icon-only) {
      --_padding-block: var(--theme-form-button-padding-block-x-small);
      --_padding-inline: var(--theme-form-button-padding-inline-large);
      --_icon-gap: var(--theme-form-button-icon-gap-large);
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

    &.tiny {
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

  --_border-width: var(--input-border-width-default);

  /*
  * Initial theme (primary)
  **/
  --_theme-form-border: var(--theme-form-primary-border);
  --_theme-form-border-hover: var(--theme-form-primary-border-hover);
  --_theme-form-outline: var(--theme-form-primary-outline);
  --_theme-form-outline-hover: var(--theme-form-primary-outline-hover);
  --_theme-form-bg: var(--theme-form-primary-bg);
  --_theme-form-bg-hover: var(--theme-form-primary-bg-hover);
  --_theme-form-color: var(--theme-form-primary-color);
  --_theme-form-color-hover: var(--theme-form-primary-color-hover);

  background-color: var(--_theme-form-bg);
  border: var(--_border-width) solid var(--_theme-form-border);
  color: var(--_theme-form-color);
  outline: 1px solid var(--_theme-form-outline);

  /*
  * Themes (alternate)
  **/
  &.theme-secondary {
    --_theme-form-border: var(--theme-form-secondary-border);
    --_theme-form-border-hover: var(--theme-form-secondary-border-hover);
    --_theme-form-outline: var(--theme-form-secondary-outline);
    --_theme-form-outline-hover: var(--theme-form-secondary-outline-hover);
    --_theme-form-bg: var(--theme-form-secondary-bg);
    --_theme-form-bg-hover: var(--theme-form-secondary-bg-hover);
    --_theme-form-color: var(--theme-form-secondary-color);
    --_theme-form-color-hover: var(--theme-form-secondary-color-hover);
  }

  &.theme-tertiary {
    --_theme-form-border: var(--theme-form-tertiary-border);
    --_theme-form-border-hover: var(--theme-form-tertiary-border-hover);
    --_theme-form-outline: var(--theme-form-tertiary-outline);
    --_theme-form-outline-hover: var(--theme-form-tertiary-outline-hover);
    --_theme-form-bg: var(--theme-form-tertiary-bg);
    --_theme-form-bg-hover: var(--theme-form-tertiary-bg-hover);
    --_theme-form-color: var(--theme-form-tertiary-color);
    --_theme-form-color-hover: var(--theme-form-tertiary-color-hover);
  }

  &.theme-ghost {
    --_theme-form-border: var(--theme-form-ghost-border);
    --_theme-form-border-hover: var(--theme-form-ghost-border-hover);
    --_theme-form-outline: var(--theme-form-ghost-outline);
    --_theme-form-outline-hover: var(--theme-form-ghost-outline-hover);
    --_theme-form-bg: var(--theme-form-ghost-bg);
    --_theme-form-bg-hover: var(--theme-form-ghost-bg-hover);
    --_theme-form-color: var(--theme-form-ghost-color);
    --_theme-form-color-hover: var(--theme-form-ghost-color-hover);
  }

  /*
  * States
  **/
  &:hover,
  &:focus-visible {
    --_theme-form-color: var(--_theme-form-color-hover);
    --_theme-form-bg: var(--_theme-form-bg-hover);
    --_theme-form-border: var(--_theme-form-border-hover);
    --_theme-form-outline: var(--_theme-form-outline-hover);
  }
}
</style>
