<template>
  <div class="input-text-material" :class="[{ error: fieldHasError }]">
    <label
      class="label"
      :class="[{ active: isFocused }, { dirty: isDirty }]"
      :for="id"
      >{{ labelText }}</label
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
        v-model:isDirty="isDirty"
        :c12
        :style-class-passthrough="styleClassPassthroughRef"
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
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const labelText = computed(() => {
  return fieldHasError.value ? errorMessage.value : props.c12.label;
});

const { styleClassPassthroughRef, updateClasses } =
  useUpdateStyleClassPassthrough(props.styleClassPassthrough);

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = ref(false);
const isDirty = ref(false);

const { errorMessage, setDefaultError, fieldHasError } = useErrorMessage(
  name.value,
  modelValue
);
setDefaultError(props.c12.errorMessage);
</script>

<style lang="css">
.input-text-material {
  input {
    background-color: transparent;
    line-height: var(--line-height);

    &:focus {
      outline: none;
      box-shadow: none;
      border: none;
    }
  }

  label {
    margin: initial;
    line-height: var(--line-height);
    padding: initial;
  }

  --_gutter: 12px;
  --_form-theme: var(--theme-primary);
  --_border-width: var(--input-border-width-default);

  display: grid;
  border-radius: 2px;
  outline: var(--_border-width) solid var(--_form-theme);

  margin-bottom: 20px;
  overflow: hidden;
  /* transition: all linear 0.2s; */

  &:focus-within {
    outline: calc(var(--_border-width) * 2) solid var(--_form-theme);
    background-color: hsl(from var(--_form-theme) h s 95%);
  }

  &.error {
    outline: calc(var(--_border-width) * 2) solid var(--theme-error);
    background-color: hsl(from var(--theme-error) h s 95%);

    /* .label {
      color: var(--theme-error);
    } */
  }

  .label {
    grid-row: 1;
    grid-column: 1;

    font-family: var(--font-family);
    font-size: 20px;
    font-weight: 700;
    padding: var(--_gutter);
    transform: translateY(12px);
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
      font-size: var(--font-size);
      margin: 0;
      opacity: 0;
      transition: opacity linear 0.2s;

      &.active,
      &.dirty {
        opacity: 1;
      }
      /*
      &::placeholder,
      &:-ms-input-placeholder,
      &::-moz-placeholder, */
      &::-webkit-input-placeholder {
        font-family: var(--font-family);
        /* color: var(--gray-5); */
        color: hsl(from var(--_form-theme) h s 50%);
        font-size: var(--font-size);
        font-style: italic;
        font-weight: 500;
      }
    }
  }
}
</style>
