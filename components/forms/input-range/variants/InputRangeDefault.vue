<template>
  <div class="input-range-with-label" :class="[styleClassPassthrough, `theme-${theme}`, { error: fieldHasError }]">
    <label class="input-range-label" :for="id">{{ c12.label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <InputRangeCore :id :name :required :c12 v-model="modelValue" :theme :size :weight :min :max :step>
      <template v-if="hasLeftContent" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightContent" #right>
        <slot name="right"></slot>
      </template>
    </InputRangeCore>
  </div>
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
  required: {
    type: Boolean,
    value: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
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
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return propValidators.weight.includes(value);
    },
  },
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel() as Ref<IFormData>;

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});
const fieldHasError = computed(() => {
  return modelValue.value!.submitAttempted && !modelValue.value!.formFieldsC12[name.value].isValid;
});
</script>

<style lang="css">
.input-range-with-label {
  --_form-theme: var(--theme-form-primary);
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);
  --_label-padding-inline: 10px;

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  .input-range-label {
    color: var(--_form-theme);
    display: block;
    font-family: var(--font-family);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;

    &:hover {
      cursor: pointer;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 16px;
    margin-top: 12px;
    color: var(--theme-form-secondary);
  }
}
</style>
