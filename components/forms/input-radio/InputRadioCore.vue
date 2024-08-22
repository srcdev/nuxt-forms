<template>
  <div class="input-radio-wrapper" :class="[`theme-${theme}`, size, { error: fieldHasError }]">
    <input
      type="radio"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="props.required && !props.multipleOptions"
      :value="trueValue"
      :class="['input-radio', radioStyle, { error: fieldHasError }]"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
    <div v-if="radioStyle === 'styled'" class="styled-radio" :class="[{ checked: isChecked }]"></div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

import type { InpuTextC12, IFormFieldC12, IFormData } from '@/types/types.forms';
// import { validationConfig } from '@/components/forms/c12/validation-patterns';

const props = defineProps({
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  multipleOptions: {
    type: Boolean,
    default: false,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  radioStyle: {
    type: String as PropType<string>,
    default: 'styled',
    validator(value: string) {
      return propValidators.radioStyle.includes(value);
    },
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel() as Ref<IFormData>;

// const updateFocus = (name: string, isFocused: boolean) => {
//   modelValue.value.focusedField = isFocused ? name : '';
// };

// const isFocused = computed(() => {
//   return modelValue.value.focusedField == name.value;
// });

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

// const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

// const componentValidation = validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const isArray = Array.isArray(modelValue.value.data[name.value]);

const isChecked = computed(() => {
  if (isArray) {
    if (name.value in modelValue.value.data) {
      const keyValue = modelValue.value.data[name.value] as any[];
      const isValid = keyValue.indexOf(props.trueValue) > -1;
      // modelValue.value.validityState[name.value] = isValid;
      return isValid;
    }
  } else {
    const isValid = modelValue.value.data[name.value] === props.trueValue;
    modelValue.value.validityState[name.value] = isValid;
    return isValid;
  }
});
// watch(isChecked, () => {
//   console.log('inputField.value', inputField.value?.validity);
// });

// const fieldIsDirty = computed(() => {
//   return modelValue.value!.formFieldsC12[name.value].isDirty;
// });
const fieldHasError = computed(() => {
  return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
});

// const { updateFieldValidity } = useFormControl(name.value);

if (
  // !isArray &&
  modelValue.value.formFieldsC12[name.value] === undefined
) {
  const formFieldC12 = <IFormFieldC12>{
    label: props.c12.label,
    placeholder: props.c12.placeholder,
    errorMessage: props.c12.errorMessage,
    useCustomError: false,
    customErrors: {},
    isValid: false,
    isDirty: false,
    type: isArray ? 'array' : 'string',
    previousValue: null,
  };
  modelValue.value.formFieldsC12[name.value] = formFieldC12;
}

// const { initFormFieldsC12 } = useFormControl();
// initFormFieldsC12(props.name, formFieldC12);

const fieldValue = computed(() => {
  return modelValue.value.data[name.value];
});

watch(fieldValue, () => {
  if (isArray) {
    // console.log(Object.values(modelValue.value.data[name.value] ?? []).length);
    modelValue.value.validityState[name.value] = Object.values(modelValue.value.data[name.value] ?? []).length > 0;
    modelValue.value!.formFieldsC12[name.value].isValid = modelValue.value.validityState[name.value];
    // console.log(Object.keys(modelValue.value.data[name.value]).length);
    // if (name.value in modelValue.value.data) {
    //   const keyValue = modelValue.value.data[name.value] as any[];
    //   const isValid = keyValue.indexOf(props.trueValue) > -1;
    //   modelValue.value.validityState[name.value] = isValid;
    // }
  } else {
    // updateFieldValidity(name.value, inputField.value?.validity.valid ?? false);
    if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
      modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
    }
    modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
  }

  // if (modelValue.value!.formFieldsC12[name.value].useCustomError && modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue) {
  //   modelValue.value!.validityState[name.value] = false;
  //   modelValue.value!.formFieldsC12[name.value].isValid = false;
  //   modelValue.value.displayErrorMessages = true;
  // }
});

// const isValid = () => {
//   setTimeout(() => {
//     modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
//     modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
//     if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
//       modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
//     }
//   }, 0);
// };

// onMounted(() => {
//   isValid();
// });
</script>

<style lang="css">
.input-radio-wrapper {
  --_form-theme: var(--theme-form-primary);
  --_border-width: 3px;
  --_border-color: var(--gray-0);
  --_outline-width: var(--input-outline-width-default);
  --_outline-color: var(--_form-theme);
  --_box-shadow-color: hsl(from var(--_form-theme) h s 50%);
  --_radio-size: 40px;
  --_radio-fill-colour: var(--gray-0);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  &.x-small {
    --_radio-size: 12px;
  }
  &.small {
    --_radio-size: 16px;
  }
  &.normal {
    --_radio-size: 20px;
  }
  &.medium {
    --_radio-size: 24px;
  }
  &.large {
    --_radio-size: 28px;
  }

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
  }

  &.error {
    --_outline-color: var(--theme-error);
  }

  .styled-radio {
    grid-column: 1;
    grid-row: 1;
    background-color: var(--_radio-fill-colour);
    border-radius: 50%;
    border: var(--_border-width) solid var(--_border-color);
    outline: var(--_outline-width) solid var(--_outline-color);
    box-shadow: none;

    height: var(--_radio-size);
    width: var(--_radio-size);

    transition: all 0.2s ease-in-out;

    &.checked {
      background-color: var(--_form-theme);
    }

    .input-radio:focus + & {
      box-shadow: 0 0 2px 2px var(--_box-shadow-color);
    }
  }

  .input-radio {
    opacity: 0;

    display: grid;
    grid-column: 1;
    grid-row: 1;
    border-radius: 50%;
    border: var(--_border-width) solid var(--_form-theme);
    height: var(--_radio-size);
    width: var(--_radio-size);

    margin: 0;

    &.styled {
      appearance: none;
      overflow: hidden;
      height: initial;
      width: initial;
    }

    &:focus {
      border: var(--_border-width) solid var(--_form-theme);
      outline: var(--_outline-width) solid hsl(from var(--_form-theme) h s 50%);
    }

    /* &:checked::after {
      content: '';
      display: grid;
      font-family: var(--font-family);
      place-content: center;
      font-size: calc(var(--_radio-size) * 0.75);
    } */
    &.error {
      /* border-color: var(--theme-error); */

      border: var(--_border-width) solid var(--theme-error);
      outline: var(--_outline-width) solid hsl(from var(--theme-error) h s 75%);

      background-color: hsl(from var(--theme-error) h s 95%);
    }
  }
}
</style>
