<template>
  <div
    class="input-text-material"
    :class="[`theme-${theme}`, { error: fieldHasError }, { compact: compact }]"
  >
    <label
      class="label"
      :class="[{ active: isFocused }, { dirty: isDirty }, { compact: compact }]"
      :for="id"
    >
      <span>{{ labelText }}</span>
    </label>
    <div
      class="input-text-container"
      :class="[{ active: isFocused }, { dirty: isDirty }, { compact: compact }]"
    >
      <slot name="input"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';

const props = defineProps({
  type: {
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(
        value
      );
    },
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  validation: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    value: false,
  },
  isPending: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
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
});

const compact = ref(true);

const labelText = computed(() => {
  return fieldHasError.value ? errorMessage.value : props.c12.label;
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = defineModel('isFocused') as Ref<boolean>;
const isDirty = defineModel('isDirty') as Ref<boolean>;

const { errorMessage, setDefaultError, fieldHasError } = useErrorMessage(
  props.name,
  modelValue
);
setDefaultError(props.c12.errorMessage);
</script>

<style lang="css">
.input-text-material {
  input {
    background-color: transparent;
    line-height: var(--line-height);

    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }

    &:-internal-autofill-selected,
    &:autofill {
      background-color: transparent !important;
    }
  }

  label {
    margin: initial;
    line-height: var(--line-height);
    padding: initial;
  }

  --_gutter: 12px;
  --_form-theme: var(--theme-form-primary);
  --_border-width: var(--input-border-width-default);

  display: grid;
  border-radius: 2px;
  border: var(--_border-width) solid var(--_form-theme);

  margin-bottom: 20px;
  overflow: hidden;

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
  }

  &:focus-within {
    border: var(--_border-width) solid var(--_form-theme);
    outline: var(--_border-width) solid hsl(from var(--_form-theme) h s 50%);
    background-color: hsl(from var(--_form-theme) h s 95%);
  }

  &.error {
    /* outline: calc(var(--_border-width) * 2) solid var(--theme-error); */

    border: var(--_border-width) solid var(--theme-error);
    outline: var(--_border-width) solid hsl(from var(--theme-error) h s 75%);

    background-color: hsl(from var(--theme-error) h s 95%);
  }

  .label {
    grid-row: 1;
    grid-column: 1;

    font-family: var(--font-family);
    font-size: 20px;
    font-weight: 700;
    padding: var(--_gutter);
    transform: translateY(12px);
    transition: all linear 0.2s;
    background-color: transparent;
    z-index: 2;

    &.active,
    &.dirty {
      font-size: 16px;
      transform: translateY(-2px);
      z-index: auto;
    }
  }

  .input-text-container {
    display: grid;
    grid-row: 1;
    grid-column: 1;
    margin-top: 2rem;
    background-color: transparent;
    opacity: 0;
    transition: opacity linear 0.2s;

    &.active,
    &.dirty {
      opacity: 1;
    }

    .input-text {
      font-family: var(--font-family);
      border: 0px solid green;
      padding: calc(var(--_gutter) / 2) var(--_gutter);
      font-size: var(--font-size);
      margin: 0;
      /* opacity: 0;
      transition: opacity linear 0.2s;

      &.active,
      &.dirty {
        opacity: 1;
      } */
      /*
      &::placeholder,
      &:-ms-input-placeholder,
      &::-moz-placeholder, */
      &::-webkit-input-placeholder {
        font-family: var(--font-family);
        /* color: var(--gray-5); */
        color: hsl(from var(--_form-theme) h s 50%);
        font-size: var(--font-size);
        font-style: italic;
        font-weight: 500;
      }
    }
  }
}

/*
* Compact UI
**/

.input-text-material {
  &.compact {
    overflow: initial;

    &:focus-within {
      background-color: initial;
    }

    &.error {
      background-color: initial;
    }
  }

  .label {
    &.compact {
      align-content: center;
      font-size: 16px;
      padding: 0 12px;
      transform: translateY(0);

      span {
        padding: 0 8px;
      }

      &.active,
      &.dirty {
        font-size: 16px;
        font-weight: 500;
        transform: translateY(-26px);
        z-index: auto;

        span {
          background-color: white;
        }
      }
    }
  }

  .input-text-container {
    &.compact {
      margin: 8px;
    }
  }
}
</style>
