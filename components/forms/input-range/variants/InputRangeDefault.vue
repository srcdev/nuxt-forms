<template>
  <div class="input-range-with-label" :class="[c12n.styleClassPassthrough, `theme-${theme}`, { error: c12n.fieldHasError }]">
    <label class="input-range-label" :for="c12n.id">{{ c12n.label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <InputRangeCore :c12n v-model="modelValue" :theme :size :weight>
      <template v-if="hasDataList" #datalist>
        <slot name="datalist"></slot>
      </template>
      <template v-if="hasLeftContent" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateRange(-c12n.step, Number(modelValue) > c12n.min)"
          :readonly="Number(modelValue) === c12n.min"
          :is-pending="false"
          buttonText="Step down"
          theme="ghost"
          size="x-small"
        >
          <template #iconOnly>
            <slot name="left"></slot>
          </template>
        </InputButtonCore>
      </template>
      <template v-if="hasRightContent" #right>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateRange(c12n.step, Number(modelValue) < c12n.max)"
          :readonly="Number(modelValue) === c12n.max"
          :is-pending="false"
          buttonText="Step up"
          theme="ghost"
          size="x-small"
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputRangeCore>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

import type { C12nInputRange, IFormFieldC12, IFormData } from '@/types/types.forms';
// import { validationConfig } from '@/components/forms/c12/validation-patterns';

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
const hasDescription = computed(() => slots.description !== undefined);
const hasDataList = computed(() => slots.datalist !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel<number | readonly number[]>();

const updateRange = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};
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
