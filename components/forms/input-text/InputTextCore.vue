<template>
  <div class="input-text-wrapper" :class="[{ dirty: isDirty }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]">
    <span v-if="hasLeftSlot" class="left-slot">
      <slot name="left"></slot>
    </span>

    <input
      :type="c12n.type"
      :placeholder="c12n.placeholder ?? ''"
      :id="c12n.id"
      :name="c12n.name"
      :required="c12n.required"
      :class="['input-text-core', 'text-normal', elementClasses, { dirty: isDirty }, { error: c12n.fieldHasError }]"
      v-model="modelValue"
      ref="inputField"
      :aria-invalid="c12n.fieldHasError"
      :aria-describedby="`${c12n.id}-error-message`"
    />

    <span v-if="hasRightSlot" class="right-slot">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { C12nInputTextCore, IFormFieldC12, IFormData, IFieldsInitialState, TFieldsInitialState } from '@/types/types.forms';

const { c12n, styleClassPassthrough } = defineProps({
  c12n: {
    type: Object as PropType<C12nInputTextCore>,
    required: true,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const modelValue = defineModel();
const isDirty = defineModel('isDirty');

const inputField = ref<HTMLInputElement | null>(null);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

onMounted(() => {
  updateElementClasses(['deep-bristol', 'deep-london', 'deep-bath']);
});
</script>

<style lang="css">
.input-text-wrapper {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_gutter: 12px;
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);

  display: flex;
  align-items: center;

  border-radius: 2px;
  border: var(--_border-width) solid var(--_border-color);

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
  }

  &.error {
    --_form-theme: var(--theme-error);
  }

  &:focus-within {
    --_border-color: white;
    background-color: hsl(from var(--_form-theme) h s 95%);

    outline: var(--focus-visible-outline);
    box-shadow: var(--focus-visible-box-shadow);
  }

  &.has-left-slot {
    .left-slot {
      display: flex;
      align-items: center;
    }
  }

  &.has-right-slot {
    .right-slot {
      display: flex;
      align-items: center;
    }
  }

  .input-text-core {
    border: none;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    color: var(--_form-theme);
    font-family: var(--font-family);
    line-height: var(--line-height);
    padding: 8px 12px;

    /*
      &::placeholder,
      &:-ms-input-placeholder,
      &::-moz-placeholder, */
    &::-webkit-input-placeholder {
      font-family: var(--font-family);
      /* color: var(--gray-5); */
      /* color: hsl(from var(--_form-theme) h s 50%); */
      font-size: var(--font-size);
      font-style: italic;
      font-weight: 500;
    }
  }
}
</style>
