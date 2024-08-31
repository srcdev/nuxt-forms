<template>
  <div class="input-text-material" :class="[`theme-${theme}`, { error: fieldHasError }, { compact: compact }]">
    <label class="label" :class="[{ active: isFocused }, { error: fieldHasError }, { dirty: fieldIsDirty }, { compact: compact }]" :for="id">
      <span>{{ labelText }}</span>
    </label>
    <div class="input-text-container" :class="[{ active: isFocused }, { error: fieldHasError }, { dirty: fieldIsDirty }, { compact: compact }]">
      <slot name="input"></slot>
    </div>
    <InputError :c12 :fieldHasError :id></InputError>
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
    required: true,
    validator(value: string) {
      return propValidators.inputTypesText.includes(value);
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

const errorMessage = computed(() => {
  if (
    typeof modelValue.value!.formFieldsC12[props.name] !== 'undefined' &&
    modelValue.value!.formFieldsC12[props.name].useCustomError &&
    modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue
  ) {
    const customErrorsMessages = modelValue.value.formFieldsC12[props.name]?.customErrors || [];
    let errorMessages = '';

    if (Array.isArray(customErrorsMessages)) {
      customErrorsMessages.forEach((message: string, index: number) => {
        const join = index === 0 ? '' : ', ';
        errorMessages += join + message;
      });
    } else {
      errorMessages = modelValue.value.formFieldsC12[props.name].customErrors as string;
    }

    return errorMessages;
  } else {
    return props.c12.errorMessage;
  }
});

const labelText = computed(() => {
  return props.c12.label;
  // if (modelValue.value.submitAttempted && !modelValue.value.formFieldsC12[props.name].isValid) {
  //   return errorMessage.value;
  // } else {
  //   return props.c12.label;
  // }
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
  }
  return false;
});

// const { fieldHasError } = useFormControl(props.name);

// watch(
//   () => errorMessage.value,
//   (newValue, oldValue) => {
//     if (newValue !== oldValue) {
//       console.log(`${props.name} errorMessage "${errorMessage.value}"`);
//     }
//   }
// );
</script>

<style lang="css">
.input-text-material {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_gutter: 12px;
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  /*
  &:has(.input-text:invalid),
  &:has(.input-textarea:invalid) {
    --_form-theme: green;
  }
  */

  /*
  &:not(:placeholder-shown):invalid {
    --_form-theme: green;
  }
  &:has(.text-input:not(:placeholder-shown):invalid) {
    --_form-theme: red;
  }

  */

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
    color: var(--_form-theme);
    margin: initial;
    line-height: var(--line-height);
    padding: initial;
    transition: color 0.2s ease-in-out;
  }

  display: grid;
  border-radius: 2px;
  border: var(--_border-width) solid var(--_form-theme);

  margin-bottom: 20px;
  overflow: hidden;

  &:focus-within {
    border: var(--_border-width) solid var(--_form-theme);
    outline: var(--_outline-width) solid hsl(from var(--_form-theme) h s 50%);
    background-color: hsl(from var(--_form-theme) h s 95%);
  }

  &:has(.input-text-core:focus-visible),
  &:has(.input-button-core:focus-visible) {
    box-shadow: 0 0 2px 3px var(--_focus-colour);
    outline-color: var(--_focus-colour);
  }

  &.error {
    /* outline: calc(var(--_border-width) * 2) solid var(--theme-error); */

    border: var(--_border-width) solid var(--theme-error);
    outline: var(--_outline-width) solid hsl(from var(--theme-error) h s 75%);

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
      height: 1.5em;
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

    .input-text-core {
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
        transform: translateY(-14px);
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
