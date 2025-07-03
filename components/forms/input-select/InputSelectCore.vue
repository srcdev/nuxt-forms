<template>
  <div class="input-select-wrapper" :data-form-theme="formTheme" :data-size="size" :class="[inputVariant, size, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }]">
    <select v-model="modelValue" class="input-select-core" :name :id>
      <option v-if="placeholder" value="" readonly :selected="!modelValue" class="input-select-core-option placeholder">{{ placeholder }}</option>
      <option v-for="item in fieldData.data" :key="item.id" :value="item.value" :selected="item.value === modelValue" class="input-select-core-option">
        <Icon :name="item.icon" class="input-select-core-option-icon" />
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
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
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  inputVariant: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.inputVariant.includes(value);
    },
  },
});

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel({ required: true });
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;
</script>

<style lang="css">
.input-select-wrapper {
  background-color: var(--element-decorator-background-color);
  outline: var(--element-decorator-outline-default);

  border-top-left-radius: var(--element-decorator-border-top-left-radius);
  border-top-right-radius: var(--element-decorator-border-top-right-radius);
  border-bottom-left-radius: var(--element-decorator-border-bottom-left-radius);
  border-bottom-right-radius: var(--element-decorator-border-bottom-right-radius);

  border-top: var(--element-decorator-border-top-default);
  border-right: var(--element-decorator-border-right-default);
  border-bottom: var(--element-decorator-border-bottom-default);
  border-left: var(--element-decorator-border-left-default);

  .input-select-core {
    /* Start modern Select CSS */
    &,
    &::picker(select) {
      appearance: base-select;
    }

    &::picker(select) {
      transition: display allow-discrete var(--input-select-animation-duration), opacity var(--input-select-animation-duration), overlay var(--input-select-animation-duration) allow-discrete;
    }

    &:not(:open)::picker(select) {
      opacity: 0;
    }

    &:open::picker(select) {
      opacity: 1;
      border: var(--form-element-border-width) solid var(--theme-form-input-border);
      outline: var(--form-element-outline-width) solid var(--_input-select-outline-color);

      @starting-style {
        opacity: 0;
      }
    }

    border: none;
    outline: none;
    border-radius: 0;
    width: 100%;

    &:hover {
      /* background-color: lab(89.6502 -0.829279 -2.45323 / 0.1); */
      background-color: hsl(from var(--theme-form-input-border) h s 20%);
    }

    /* END modern Select CSS */

    /* color: var(--_input-text-core-color); */
    font-family: var(--font-family);
    font-size: var(--form-element-font-size);
    line-height: var(--form-element-line-height);
    padding-block: var(--input-select-padding-block);
    padding-inline: var(--input-select-padding-inline);

    .input-select-core-option {
      padding-block: var(--input-select-option-padding-block);
      padding-inline: var(--input-select-option-padding-inline);
      gap: var(--input-select-option-gap);

      &:hover {
        background-color: var(--input-select-option-background-color-hover);
      }

      .input-select-core-option-icon {
        display: inline-block;
        width: var(--input-select-option-icon-size);
        height: var(--input-select-option-icon-size);
      }
    }
  }
}
</style>
