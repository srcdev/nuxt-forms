<template>
  <div class="input-checkbox-wrapper" :class="[{ 'has-left-content': hasLeftContent }, { 'has-right-content': hasRightContent }]">
    <input
      type="checkbox"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="props.required && !props.multipleOptions"
      :value="trueValue"
      :class="['input-checkbox']"
      v-model="modelValue.data[name]"
      ref="inputField"
    />
  </div>
</template>

<script setup lang="ts">
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
watch(isChecked, () => {
  console.log('inputField.value', inputField.value?.validity);
});

// const fieldIsDirty = computed(() => {
//   return modelValue.value!.formFieldsC12[name.value].isDirty;
// });
// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
// });

// // const { fieldHasError } = useFormControl(name.value);

// const formFieldC12 = <IFormFieldC12>{
//   label: props.c12.label,
//   placeholder: props.c12.placeholder,
//   errorMessage: props.c12.errorMessage,
//   useCustomError: false,
//   customErrors: {},
//   isValid: false,
//   isDirty: false,
//   type: 'string',
//   previousValue: null,
// };
// modelValue.value!.formFieldsC12[name.value] = formFieldC12;

// const { initFormFieldsC12 } = useFormControl();
// initFormFieldsC12(props.name, formFieldC12);

// const fieldValue = computed(() => {
//   return modelValue.value.data[name.value];
// });

// watch(fieldValue, () => {
//   if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
//     modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
//   }
//   modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
//   modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;

//   if (modelValue.value!.formFieldsC12[name.value].useCustomError && modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue) {
//     modelValue.value!.validityState[name.value] = false;
//     modelValue.value!.formFieldsC12[name.value].isValid = false;
//     modelValue.value.displayErrorMessages = true;
//   }
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

<style lang="css">
.input-textarea-wrapper {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;

  &.has-left-content {
    grid-template-columns: auto 1fr;
    margin-left: var(--_gutter);

    .left-content {
      display: flex;
      align-items: center;
    }
  }

  &.has-right-content {
    display: grid;
    grid-template-columns: 1fr auto;
    /* display: flex; */
    margin-right: var(--_gutter);

    .right-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
