<template>
  <div class="input-radio-with-label">
    <InputRadioCore :id :name :required :c12 v-model="modelValue" :theme :size :trueValue :falseValue />
    <label :for="id">{{ c12.label }}</label>
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
const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});
// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[props.name].isValid;
// });
</script>

<style lang="css">
.input-radio-with-label {
  --_form-theme: var(--theme-form-primary);
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);
  --_radio-size: 40px;

  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
