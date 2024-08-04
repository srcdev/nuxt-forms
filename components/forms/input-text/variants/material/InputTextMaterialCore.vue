<template>
  <div class="input-text-material" :class="[`theme-${theme}`, { error: fieldHasError }, { compact: compact }]">
    <label class="label" :class="[{ active: isFocused }, { error: fieldHasError }, { dirty: fieldIsDirty }, { compact: compact }]" :for="id">
      <span>{{ labelText }}</span>
    </label>
    <div class="input-text-container" :class="[{ active: isFocused }, { error: fieldHasError }, { dirty: fieldIsDirty }, { compact: compact }]">
      <slot name="input"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';

import propValidators from '../../../c12/prop-validators';

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
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(value);
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
  required: {
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
  compact: {
    type: Boolean,
    value: false,
  },
});

const labelText = computed(() => {
  if (typeof modelValue.value!.formFieldsC12[props.name] !== 'undefined') {
    if (modelValue.value.submitAttempted && !modelValue.value.formFieldsC12[props.name].isValid) {
      if (modelValue.value.formFieldsC12[props.name].useCustomError) {
        return modelValue.value.formFieldsC12[props.name].customErrors;
      } else {
        return modelValue.value.formFieldsC12[props.name].errorMessage;
      }
    } else {
      return props.c12.label;
    }
  }
});

const modelValue = defineModel() as Ref<IFormData>;

const isFocused = computed(() => {
  return modelValue.value.focusedField == props.name;
});

const fieldIsDirty = computed(() => {
  if (typeof modelValue.value!.formFieldsC12[props.name] !== 'undefined') {
    return modelValue.value!.formFieldsC12[props.name].isDirty;
  } else {
    return false;
  }
});

const fieldHasError = computed(() => {
  if (typeof modelValue.value!.formFieldsC12[props.name] !== 'undefined') {
    return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[props.name].isValid;
  } else {
    return false;
  }
});
// const { errorMessage, setDefaultError, fieldHasError } = useErrorMessage(props.name, modelValue);
// setDefaultError(props.c12.errorMessage);

// const { fieldIsDirty } = useFormControl();
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
    &.dirty,
    &.error {
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
    &.dirty,
    &.error {
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
      &.dirty,
      &.error {
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
      margin: 10px 8px 6px 8px;
    }
  }
}
</style>
