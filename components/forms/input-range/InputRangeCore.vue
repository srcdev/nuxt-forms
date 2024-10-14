<template>
  <div class="input-range-wrapper">
    <div v-if="hasLeftContent" class="slot left">
      <slot name="left"></slot>
    </div>

    <div class="input-range-container">
      <input
        type="range"
        :id="c12n.id"
        :name="c12n.name"
        :required="c12n.required"
        :min="c12n.min"
        :max="c12n.max"
        :step="c12n.step"
        :list="hasDataList ? c12n.name + '-datalist' : ''"
        :class="['input-range-core', `input-range--${theme}`, `input-range--${size}`, `input-range--${weight}`, c12n.styleClassPassthrough]"
        v-model="modelValue"
        ref="inputField"
      />

      <template v-if="hasDataList">
        <slot name="datalist"></slot>
      </template>
    </div>
    <div v-if="hasRightContent" class="slot right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

import type { C12nInputRange, IFormFieldC12, IFormData } from '@/types/types.forms';
const { c12n, theme, size, weight } = defineProps({
  c12n: {
    type: Object as PropType<C12nInputRange>,
    required: true,
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
const hasDataList = computed(() => slots.datalist !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel<number | readonly number[]>();
</script>

<style lang="css">
.input-range-wrapper {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_gutter: 12px;
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);
  --_outline-width: var(--input-outline-width-thin);

  --_input-range-height: 24px;
  --_slot-translate-y: calc(var(--_input-range-height) / 4);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .slot {
    align-self: flex-start;
    transform: translateY(-4px);
  }

  .input-range-container {
    flex-grow: 1;
    .input-range-core {
      height: var(--_input-range-height);
      margin: 0;
      width: 100%;

      &:focus-visible {
        outline: var(--focus-visible-outline);
        box-shadow: var(--focus-visible-box-shadow);
      }
    }

    .input-range-datalist {
      display: flex;
      flex-direction: column;
      font-family: var(--font-family);
      font-size: 14px;
      font-weight: 500;
      justify-content: space-between;
      writing-mode: vertical-lr;
      width: 100%;
      option {
        padding: 0;
      }
    }
  }
}
</style>
