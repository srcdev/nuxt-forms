<template>
  <div class="input-checkbox-with-label" :class="[c12n.styleClassPassthrough, { error: c12n.fieldHasError }]">
    <InputCheckboxCore
      :id="c12n.id"
      :name="c12n.name"
      :required="c12n.required"
      v-model="modelValue"
      :size
      :trueValue
      :falseValue
      :checkboxAppearance
      :checkboxStyle
      :fieldHasError="c12n.fieldHasError"
    />
    <label class="input-checkbox-label" :for="c12n.id">{{ c12n.label }}</label>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

import type { C12nInputCheckboxWithLabel, IFormFieldC12, IFormData } from '@/types/types.forms';
// import { validationConfig } from '@/components/forms/c12/validation-patterns';

const { c12n, trueValue, falseValue, multipleOptions, size, checkboxAppearance, checkboxStyle } = defineProps({
  c12n: {
    type: Object as PropType<C12nInputCheckboxWithLabel>,
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
