<template>
  <div class="input-text-material">
    <label class="label" :class="[{ active: isFocused }]" :for="id"
      >{{ c12.label }} - isFocused({{ isFocused }})</label
    >
    <div class="input-placeholder">
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
</script>

<style lang="css">
.input-text-material {
  --_gutter: 12px;

  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: var(--_gutter) 1fr var(--_gutter); */
  grid-template-rows: var(--_gutter) 1fr var(--_gutter);
  gap: calc(var(--_gutter) / 2);

  border: 1px solid red;
  border-radius: 2px;

  margin-bottom: 20px;
  /* padding: calc(2 * var(--_gutter)); */

  .label {
    grid-row: 2;
    grid-column: 1;

    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 700;
    padding: var(--_gutter);
    /* transform: translateY(12px); */

    z-index: 2;

    transition: all linear 0.2s;

    &.active {
      grid-row: 1;
      grid-column: 1;
      /* padding: 0; */
      transform: translateY(-10px);
    }
  }

  .input-placeholder {
    grid-row: 2;
    grid-column: 1;
    align-content: center;
    padding-inline: var(--_gutter);
    transform: translateY(12px);

    .input-text {
      font-family: var(--font-family);
      border: 0px solid green;
      padding: var(--_gutter);
      font-size: 16px;

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
