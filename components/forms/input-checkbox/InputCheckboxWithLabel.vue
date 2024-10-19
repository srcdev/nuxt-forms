<template>
  <div class="input-checkbox-with-label" :class="[elementClasses, { error: fieldHasError }]">
    <InputCheckboxCore :id :name :required v-model="modelValue" :size :trueValue :falseValue :checkboxAppearance :checkboxStyle :fieldHasError />
    <label class="input-checkbox-label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

import type { C12nInputCheckboxWithLabel, IFormFieldC12, IFormData } from '@/types/types.forms';
// import { validationConfig } from '@/components/forms/c12/validation-patterns';

const { id, name, label, required, fieldHasError, trueValue, falseValue, multipleOptions, size, checkboxAppearance, checkboxStyle, styleClassPassthrough } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
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
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();
// const name = computed(() => {
//   return props.name !== null ? props.name : props.id;
// });
// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
// });
</script>

<style lang="css">
.input-checkbox-with-label {
  --_form-theme: var(--theme-form-primary);
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);
  --_label-padding-inline: 10px;

  display: flex;
  align-items: center;

  &.error {
    --_form-theme: var(--theme-error);
  }

  .input-checkbox-label {
    /* color: var(--_form-theme); */
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 500;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding-inline: var(--_label-padding-inline);

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
