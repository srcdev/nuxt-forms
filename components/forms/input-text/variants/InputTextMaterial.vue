<template>
  <div class="input-text-material">
    <label :for="id">{{ c12.label }}</label>
    <InputTextCore
      :id
      :name
      :type
      :validation
      :required
      v-model="modelValue"
      v-model:isFocused="isFocused"
      :c12
    />
  </div>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';
import { validationConfig } from '@/components/forms/c12/validation-patterns';

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
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = ref(false);
</script>

<style lang="css">
.input-text-material {
  display: flex;
  flex-direction: column;

  border: 1px solid black;
  border-radius: 2px;

  margin-bottom: 20px;

  .input-text {
    border: 1px solid red;
    margin: 5px;

    /* &::placeholder,
    &:-ms-input-placeholder,
    &::-moz-placeholder, */
    &::-webkit-input-placeholder {
      color: rgb(128, 0, 117);
      font-size: 30px;
    }
  }
}
</style>
