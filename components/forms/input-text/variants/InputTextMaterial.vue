<template>
  <div class="input-text-material">
    <label
      class="label"
      :class="[{ active: isFocused }, { dirty: isDirty }]"
      :for="id"
      >{{ c12.label }}</label
    >
    <div class="input-text-container">
      <InputTextCore
        :id
        :name
        :type
        :validation
        :required
        v-model="modelValue"
        v-model:isFocused="isFocused"
        :c12
        :style-class-passthrough="styleClassPassthrough"
      />
    </div>
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

const styleClassPassthrough = computed(() => {
  return isFocused.value ? 'is-active' : '';
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = ref(false);
const isDirty = computed(() => {
  return modelValue.value.data[name.value] !== '';
});
</script>

<style lang="css">
.input-text-material {
  input {
    background-color: transparent;
    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }

  --_gutter: 12px;
  --_border-default: var(--primary-border-default);
  --_border-width: var(--input-border-width-default);

  display: grid;
  border-radius: 2px;
  outline: var(--_border-width) solid var(--_border-default);

  margin-bottom: 20px;
  overflow: hidden;

  &:focus-within {
    outline: calc(var(--_border-width) * 2) solid var(--_border-default);
    background-color: hsl(from var(--_border-default) h s 95%);
  }

  .label {
    grid-row: 1;
    grid-column: 1;

    font-family: var(--font-family);
    font-size: 20px;
    font-weight: 700;
    padding: var(--_gutter);
    transform: translateY(10px);
    transition: all linear 0.2s;
    background-color: transparent;

    &.active,
    &.dirty {
      font-size: 14px;
      transform: translateY(0);
    }
  }

  .input-text-container {
    display: grid;
    grid-row: 1;
    grid-column: 1;
    margin-top: 2rem;
    background-color: transparent;

    .input-text {
      font-family: var(--font-family);
      border: 0px solid green;
      padding: calc(var(--_gutter) / 2) var(--_gutter);
      font-size: 16px;
      margin: 0;

      /* &::placeholder,
    &:-ms-input-placeholder,
    &::-moz-placeholder, */
      &::-webkit-input-placeholder {
        font-family: var(--font-family);
        color: var(--gray-5);
        font-size: 14px;
        font-style: italic;
        font-weight: 700;
        opacity: 0;

        &.is-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
