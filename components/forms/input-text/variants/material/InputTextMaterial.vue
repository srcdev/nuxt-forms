<template>
  <InputTextMaterialCore
    :type
    :id
    :name
    :validation
    :required
    :isPending
    :c12
    :styleClassPassthrough
    :theme
    v-model="modelValue"
    v-model:isFocused="isFocused"
    v-model:isDirty="isDirty"
  >
    <template #input>
      <InputTextCore
        :id
        :name
        type="text"
        :validation
        :required
        v-model="modelValue"
        v-model:isFocused="isFocused"
        v-model:isDirty="isDirty"
        :c12
        :style-class-passthrough="styleClassPassthrough"
      />
    </template>
  </InputTextMaterialCore>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';

const props = defineProps({
  type: {
    // type: String as PropType<"text" | "password" | "tel" | "number" | "email" | "url">, // This breaks props setup in unit tests
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(
        value
      );
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
  isPending: {
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
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return [
        'primary',
        'secondary',
        'tertiary',
        'text',
        'link',
        'icon-only',
        'ghost',
        'cancel',
        'confirm',
        'warning',
        'navigate-btn',
      ].includes(value);
    },
  },
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = ref(false);
const isDirty = ref(false);
</script>
