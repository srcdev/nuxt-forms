<template>
  <div class="input-checkbox-wrapper">
    <input
      type="checkbox"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="props.required && !props.multipleOptions"
      :value="trueValue"
      :class="['input-checkbox', `theme-${theme}`, size, { error: fieldHasError }]"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
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
.input-checkbox-wrapper {
  .input-checkbox {
    --_form-theme: var(--theme-form-primary);
    --_border-width: var(--input-border-width-default);
    --_checkbox-size: 40px;

    display: grid;
    border-radius: 2px;
    /* border: var(--_border-width) solid var(--_form-theme); */

    border: var(--_border-width) solid var(--_form-theme);
    /* outline: var(--_border-width) solid hsl(from var(--_form-theme) h s 50%); */

    appearance: none;
    overflow: hidden;
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);

    /* Sizes */
    &.x-small {
      --_checkbox-size: 24px;
    }
    &.small {
      --_checkbox-size: 30px;
    }
    &.normal {
      --_checkbox-size: 36px;
    }
    &.medium {
      --_checkbox-size: 40px;
    }
    &.large {
      --_checkbox-size: 44px;
    }
    &:focus {
      border: var(--_border-width) solid var(--_form-theme);
      outline: var(--_border-width) solid hsl(from var(--_form-theme) h s 50%);
    }

    &:checked::after {
      content: '✔';
      display: grid;
      font-family: var(--font-family);
      place-content: center;
      font-size: calc(var(--_checkbox-size) * 0.75);
    }
    &.error {
      /* border-color: var(--theme-error); */

      border: var(--_border-width) solid var(--theme-error);
      outline: var(--_border-width) solid hsl(from var(--theme-error) h s 75%);

      background-color: hsl(from var(--theme-error) h s 95%);
    }

    &.theme-secondary {
      --_form-theme: var(--theme-form-secondary);
    }

    /* &:valid {
      border-color: var(--theme-success);
    }
    &:invalid {
      border-color: var(--theme-error);
    }
    &:not(:placeholder-shown):valid {
      border-color: var(--theme-success);
    }
    &:not(:placeholder-shown):invalid {
      border-color: var(--theme-error);
    } */
  }
}
</style>
