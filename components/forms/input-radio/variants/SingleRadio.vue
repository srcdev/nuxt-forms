<template>
  <fieldset class="single-radio-fieldset" :class="[`theme-${theme}`, { error: fieldHasError }]">
    <legend :class="[{ 'has-description': hasDescription }]">{{ legend }}</legend>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <InputError :errorMessage :fieldHasError :id="name" :isDetached="true" />
    <InputRadioWithLabel :id :name :required :c12 v-model="modelValue" :theme :size :radioAppearance :fieldHasError />
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

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
  legend: {
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
  // multipleOptions: {
  //   type: Boolean,
  //   default: false,
  // },
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
  radioAppearance: {
    type: String as PropType<string>,
    default: null,
    validator(value: string) {
      return propValidators.radioAppearance.includes(value);
    },
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);

const modelValue = defineModel() as Ref<IFormData>;
const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});
// const fieldHasError = computed(() => {
//   return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[props.name].isValid;
// });

const errorMessage = computed(() => {
  if (
    typeof modelValue.value!.formFieldsC12[props.name] !== 'undefined' &&
    modelValue.value!.formFieldsC12[props.name].useCustomError &&
    modelValue.value.data[props.name] === modelValue.value.formFieldsC12[props.name].previousValue
  ) {
    return modelValue.value.formFieldsC12[props.name]?.customErrors || [];
  } else {
    return props.c12.errorMessage;
  }
});
</script>

<style lang="css">
.single-radio-fieldset {
  --_form-theme: var(--theme-form-primary);

  margin: 0;
  padding: 0;
  border: 0;

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  legend {
    color: var(--_form-theme);
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;

    &.has-description {
      margin-bottom: 0;
    }
  }
}
</style>
