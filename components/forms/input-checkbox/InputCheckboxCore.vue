<template>
  <div class="input-checkbox-wrapper" :class="[size, `theme-${theme}`, checkboxAppearance, { error: fieldHasError }]">
    <input
      type="checkbox"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="props.required && !props.multipleOptions"
      :value="trueValue"
      :class="['input-checkbox-core', `theme-${theme}`, size, checkboxAppearance, { error: fieldHasError }]"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
    <div v-if="checkboxAppearance === 'with-decorator'" :class="['input-checkbox-decorator', size, checkboxStyle]">
      <Icon name="material-symbols:check" class="icon-check" :class="[{ checked: isChecked }]" />
      <div v-if="checkboxStyle === 'check' || checkboxStyle === 'cross'" :class="[checkboxStyle, { checked: isChecked }]"></div>
    </div>
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
  checkboxAppearance: {
    type: String as PropType<string>,
    default: null,
    validator(value: string) {
      return propValidators.checkboxAppearance.includes(value);
    },
  },
  checkboxStyle: {
    type: String as PropType<string>,
    default: 'check',
    validator(value: string) {
      return propValidators.checkboxStyle.includes(value);
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

const isFocussed = ref(false);

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

<style scoped lang="css">
.input-checkbox-wrapper {
  --_checkbox-size: initial;
  --_checkbox-border-radius: 4px;
  --_form-theme: var(--theme-form-primary);
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);
  --_focus-colour: var(--theme-form-primary-focus);

  display: grid;
  grid-template-areas: 'checkbox-stack';

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  &.with-decorator {
    border-radius: var(--_checkbox-border-radius);
    border: var(--_border-width) solid var(--_border-color);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);

    &:has(.input-checkbox-core:focus-visible) {
      --_border-color: white;
      box-shadow: 0 0 2px 3px var(--_focus-colour);
      outline-color: var(--_focus-colour);
    }
  }

  /* Sizes */
  &.x-small {
    --_checkbox-size: 20px;
  }
  &.small {
    --_checkbox-size: 24px;
  }
  &.normal {
    --_checkbox-size: 30px;
  }
  &.medium {
    --_checkbox-size: 40px;
  }
  &.large {
    --_checkbox-size: 44px;
  }

  .input-checkbox-decorator {
    display: grid;
    grid-area: checkbox-stack;

    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    place-content: center;
    position: relative;
    z-index: -1;

    :not(&.check),
    :not(&.cross) {
      .icon-check {
        display: none;
      }
    }

    .check {
      grid-area: stack;
      width: calc(var(--_checkbox-size) * 0.2);
      height: calc(var(--_checkbox-size) * 0.45);
      border-bottom: 3px solid var(--_form-theme);
      border-right: 3px solid var(--_form-theme);
      transform: rotate(45deg) translate(-1px, -1px);
      /* transform: translate(-3px, 0px); */
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      &.checked {
        opacity: 1;
      }
    }

    .cross {
      grid-area: stack;
      width: calc(var(--_checkbox-size) * 0.65);
      height: 3px;
      background-color: var(--_form-theme);
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      &.checked {
        opacity: 1;

        &::after {
          opacity: 1;
        }
      }

      &::after {
        content: '';
        grid-area: stack;
        display: block;
        width: calc(var(--_checkbox-size) * 0.65);
        height: 3px;
        background-color: var(--_form-theme);
        transform: rotate(-90deg);
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }
    }

    .icon-check {
      grid-area: stack;
      display: block;
      height: var(--_checkbox-size);
      width: var(--_checkbox-size);
      transform: translate(-3px, 0px);
      zoom: 0.75;
      margin: 0;
      opacity: 0;
      padding: 0;
      transition: opacity 0.2s ease-in-out;

      &.checked {
        opacity: 1;
      }
    }
  }

  .input-checkbox-core {
    grid-area: checkbox-stack;
    border: var(--_border-width) solid var(--_form-theme);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);

    transition: all 0.2s ease-in-out;

    &.with-decorator {
      appearance: none;
      margin: 0;
      overflow: hidden;
      opacity: 0;
    }

    &:hover {
      cursor: pointer;
    }

    &:focus-visible {
      border-radius: var(--input-border-radius);
    }

    &:focus {
      border: var(--_border-width) solid var(--_form-theme);
      outline: var(--_outline-width) solid hsl(from var(--_form-theme) h s 50%);
    }

    &:checked::after {
      /* content: '✔'; */
      display: grid;
      font-family: var(--font-family);
      place-content: center;
      font-size: calc(var(--_checkbox-size) * 0.75);
    }
    &.error {
      /* border-color: var(--theme-error); */
      border: var(--_border-width) solid var(--theme-error);
      outline: var(--_outline-width) solid hsl(from var(--theme-error) h s 75%);
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
