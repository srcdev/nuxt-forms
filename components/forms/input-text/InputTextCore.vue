<template>
  <div class="input-text-wrapper" :class="[{ 'has-left-content': hasLeftContent }, { 'has-right-content': hasRightContent }]">
    <template v-if="hasLeftContent">
      <span class="left-content">
        <slot name="left"></slot>
      </span>
    </template>

    <input
      :type
      :placeholder="c12.placeholder"
      :id
      :name
      :pattern="componentValidation.pattern"
      :maxlength="componentValidation.maxlength"
      :required
      :class="['input-text', 'text-normal', styleClassPassthrough, { active: isFocused }, { dirty: fieldIsDirty }, { error: fieldHasError }]"
      v-model="modelValue.data[name]"
      ref="inputField"
      @focusin="updateFocus(name, true)"
      @focusout="updateFocus(name, false)"
    />

    <template v-if="hasRightContent">
      <span class="right-content">
        <slot name="right"></slot>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormFieldC12, IFormData } from '@/types/types.forms';
import { validationConfig } from '@/components/forms/c12/validation-patterns';

const props = defineProps({
  type: {
    // type: String as PropType<"text" | "password" | "tel" | "number" | "email" | "url">, // This breaks props setup in unit tests
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(value);
    },
  },
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  validation: {
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
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel() as Ref<IFormData>;

const updateFocus = (name: string, isFocused: boolean) => {
  modelValue.value.focusedField = isFocused ? name : '';
};

const isPending = computed(() => {
  return modelValue.value.isPending;
});

const isFocused = computed(() => {
  return modelValue.value.focusedField == name.value;
});

const isDirty = computed(() => {
  // return modelValue.value.dirtyFields[name.value];
  return modelValue.value!.formFieldsC12[props.name].isDirty;
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

const componentValidation = validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const { hasCustomError, removeCustomError } = useErrorMessage(name.value, modelValue);

// const fieldHasError = () => {
//   const hasApiErrorMessage = hasCustomError();
//   const inputBad = !inputField.value?.validity.valid;

//   // console.log(`InputTextCore | fieldHasError |  hasApiErrorMessage(${hasApiErrorMessage}) | inputBad(${inputBad})`);

//   if (modelValue.value.submitSuccess) {
//     console.log(`IF: InputTextCore | fieldHasError`);
//     // modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
//     // return hasApiErrorMessage ? hasApiErrorMessage : inputBad;
//     return (modelValue.value!.validityState[name.value] = !hasApiErrorMessage);
//     // return hasApiErrorMessage ? hasApiErrorMessage : inputBad;
//   }
//   return false;
// };

const fieldIsDirty = computed(() => {
  return modelValue.value!.formFieldsC12[name.value].isDirty;
});
const fieldHasError = computed(() => {
  return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
});

// const { fieldIsDirty, fieldHasError } = useFormControl();

const formFieldC12 = <IFormFieldC12>{
  label: props.c12.label,
  placeholder: props.c12.placeholder,
  errorMessage: props.c12.errorMessage,
  useCustomError: false,
  customErrors: {},
  isValid: false,
  isDirty: false,
  type: 'string',
};
modelValue.value!.formFieldsC12[name.value] = formFieldC12;

const { initFormFieldsC12 } = useFormControl();
initFormFieldsC12(props.name, formFieldC12);

watch(
  modelValue.value.data,
  () => {
    if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
      modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
    }
    modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
  },
  {
    deep: true,
  }
);

const isValid = () => {
  setTimeout(() => {
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
    modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
    if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
      modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
    }
  }, 0);
};

onMounted(() => {
  // initFormFieldsC12(props.name, formFieldC12);
  isValid();
});
</script>

<style lang="css">
.input-text-wrapper {
  align-items: center;

  &.has-left-content {
    display: grid;
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
