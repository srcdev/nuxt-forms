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
      :class="['input-text-core', 'text-normal', styleClassPassthrough, { active: isFocused }, { dirty: fieldIsDirty }, { error: fieldHasError }]"
      v-model="modelValue.data[name]"
      ref="inputField"
      :aria-invalid="fieldHasError"
      :aria-describedby="`${id}-error-message`"
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
import propValidators from '../c12/prop-validators';

const props = defineProps({
  type: {
    type: String,
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

const isFocused = computed(() => {
  return modelValue.value.focusedField == name.value;
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

const componentValidation = validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const fieldIsDirty = computed(() => {
  return modelValue.value!.formFieldsC12[name.value].isDirty;
});
const fieldHasError = computed(() => {
  return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
});

// const { fieldHasError } = useFormControl(name.value);

const formFieldC12 = <IFormFieldC12>{
  label: props.c12.label,
  placeholder: props.c12.placeholder,
  errorMessage: props.c12.errorMessage,
  useCustomError: false,
  customErrors: {},
  isValid: false,
  isDirty: false,
  type: 'string',
  previousValue: null,
};
modelValue.value!.formFieldsC12[name.value] = formFieldC12;

const { initFormFieldsC12 } = useFormControl();
initFormFieldsC12(props.name, formFieldC12);

const fieldValue = computed(() => {
  return modelValue.value.data[name.value];
});

watch(fieldValue, () => {
  if (!modelValue.value!.formFieldsC12[name.value].isDirty) {
    modelValue.value!.formFieldsC12[name.value].isDirty = modelValue.value.data[name.value] !== '';
  }
  modelValue.value!.formFieldsC12[name.value].isValid = inputField.value?.validity.valid ?? false;
  modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;

  if (modelValue.value!.formFieldsC12[name.value].useCustomError && modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue) {
    modelValue.value!.validityState[name.value] = false;
    modelValue.value!.formFieldsC12[name.value].isValid = false;
    modelValue.value.displayErrorMessages = true;
  }
});

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
  isValid();
});
</script>

<style lang="css">
.input-text-wrapper {
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
