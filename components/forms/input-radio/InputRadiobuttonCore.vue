<template>
  <div class="input-radiobutton-wrapper" :class="[size, checkboxAppearance, { error: fieldHasError }]">
    <input
      type="radio"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="required && !multipleOptions"
      :value="trueValue"
      :class="['input-radiobutton-core', size, checkboxAppearance, { error: fieldHasError }]"
      v-model="modelValue"
      ref="inputField"
    />
    <div v-if="checkboxAppearance === 'with-decorator'" :class="['input-radiobutton-decorator', size, checkboxStyle]">
      <div v-if="checkboxStyle === 'check' || checkboxStyle === 'cross'" :class="[checkboxStyle, { checked: isChecked }]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
const { id, name, required, trueValue, falseValue, multipleOptions, styleClassPassthrough, size, checkboxAppearance, checkboxStyle, fieldHasError } = defineProps({
  id: {
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
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel<any>();

// const updateFocus = (name: string, isFocused: boolean) => {
//   modelValue.value.focusedField = isFocused ? name : '';
// };

// const isFocused = computed(() => {
//   return modelValue.value.focusedField == name.value;
// });

// const name = computed(() => {
//   return props.name !== null ? props.name : props.id;
// });

// const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

// const componentValidation = validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const isArray = Array.isArray(modelValue.value);

const isChecked = computed(() => {
  if (isArray) {
    // if (name in (toRaw(modelValue.value) as any)) {
    return modelValue.value.indexOf(trueValue) > -1;
    // }
  } else {
    return modelValue.value === trueValue;
  }
});

const isFocussed = ref(false);

// watch(isChecked, () => {
//   console.log('inputField.value', inputField.value?.validity);
// });

// const fieldIsDirty = computed(() => {
//   return modelValue.value!.formFieldsC12[name.value].isDirty;
// });
// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
// });

// const { updateFieldValidity } = useFormControl(name.value);

// if (
//   // !isArray &&
//   modelValue.value.formFieldsC12[name.value] === undefined
// ) {
//   const formFieldC12 = <IFormFieldC12>{
//     label: props.c12.label,
//     placeholder: props.c12.placeholder,
//     errorMessage: props.c12.errorMessage,
//     useCustomError: false,
//     customErrors: {},
//     isValid: false,
//     isDirty: false,
//     type: isArray ? 'array' : 'string',
//     previousValue: null,
//   };
//   modelValue.value.formFieldsC12[name.value] = formFieldC12;
// }

// const { initFormFieldsC12 } = useFormControl();
// initFormFieldsC12(props.name, formFieldC12);

// const fieldValue = computed(() => {
//   return modelValue.value;
// });

// watch(fieldValue, () => {
//   if (isArray) {
//     // console.log(Object.values(modelValue.value.data[name.value] ?? []).length);
//     modelValue.value.validityState[name.value] = Object.values(modelValue.value.data[name.value] ?? []).length > 0;
//     modelValue.value!.formFieldsC12[name.value].isValid = modelValue.value.validityState[name.value];
//     // console.log(Object.keys(modelValue.value.data[name.value]).length);
//     // if (name.value in modelValue.value.data) {
//     //   const keyValue = modelValue.value.data[name.value] as any[];
//     //   const isValid = keyValue.indexOf(props.trueValue) > -1;
//     //   modelValue.value.validityState[name.value] = isValid;
//     // }
//   } else {
//     // updateFieldValidity(name.value, inputField.value?.validity.valid ?? false);
//     if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
//       modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
//     }
//     modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
//     modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
//   }

//   // if (modelValue.value!.formFieldsC12[name.value].useCustomError && modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue) {
//   //   modelValue.value!.validityState[name.value] = false;
//   //   modelValue.value!.formFieldsC12[name.value].isValid = false;
//   //   modelValue.value.displayErrorMessages = true;
//   // }
// });

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
.input-radiobutton-wrapper {
  --_checkbox-size: initial;
  --_form-theme: var(--theme-form-primary);
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--brand-grayscale-border-default);
  --_outline-color: var(--brand-grayscale-border-default);
  --_focus-colour: var(--theme-form-primary-focus);
  --_input-bg-color: white;

  display: grid;
  grid-template-areas: 'checkbox-stack';

  &.error {
    --_form-theme: var(--theme-error);
  }

  &.with-decorator {
    border-radius: 50%;
    border: var(--_border-width) solid var(--_border-color);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    overflow: hidden;

    &:has(.input-radiobutton-core:focus-visible) {
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

  .input-radiobutton-decorator {
    --_padding: 5px;
    display: grid;
    grid-area: checkbox-stack;
    background-color: var(--_input-bg-color);

    /* height: var(--_checkbox-size);
    width: var(--_checkbox-size); */
    /* padding: var(--_padding); */
    place-content: center;
    position: relative;
    z-index: -1;

    div {
      grid-area: stack;
      background-color: hsl(from var(--_form-theme) h s 50%);
      width: calc(var(--_checkbox-size) - (var(--_padding) * 2));
      height: calc(var(--_checkbox-size) - var(--_padding) * 2);
      border: 1px solid var(--_form-theme);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      /* transform: translate(-2px, -1px); */

      &.checked {
        opacity: 1;
      }
    }
  }

  .input-radiobutton-core {
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
