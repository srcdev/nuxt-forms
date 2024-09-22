<template>
  <InputTextareaMaterialCore :type :id :name :required :c12 :styleClassPassthrough :fieldHasError :theme v-model="modelValue">
    <template #input>
      <InputTextareaCore :id :name :validation :required v-model="modelValue" :c12 :styleClassPassthrough :fieldHasError />
    </template>
  </InputTextareaMaterialCore>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';

import propValidators from '../../../c12/prop-validators';

const props = defineProps({
  size: {
    type: String as PropType<string>,
    default: 'normal',
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
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
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
    default: null,
  },
  validation: {
    type: String,
    default: '',
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
  fieldHasError: {
    type: Boolean,
    default: false,
  },
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const modelValue = defineModel() as Ref<IFormData>;
</script>
