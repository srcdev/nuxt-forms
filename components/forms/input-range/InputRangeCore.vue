<template>
  <div class="input-range-wrapper" :data-form-theme="formTheme">
    <div v-if="hasLeftContent" class="slot left">
      <slot name="left"></slot>
    </div>

    <div class="input-range-container">
      <input
        type="range"
        :id
        :name
        :required
        :min
        :max
        :step
        :list="hasDataList ? name + '-datalist' : ''"
        :class="['input-range-core', `input-range--${size}`, `input-range--${weight}`, styleClassPassthrough]"
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

const { id, name, required, min, max, step, theme, size, weight, styleClassPassthrough, fieldHasError } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
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
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});

const slots = useSlots();
const hasDataList = computed(() => slots.datalist !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<number | readonly number[]>();
</script>

<style lang="css">
.input-range-wrapper {
  --_gutter: 12px;
  --_border-width: var(--input-border-width-default);
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
      color: var(--theme-form-input-text);
      height: var(--_input-range-height);
      margin: 0;
      width: 100%;

      &:focus-visible {
        box-shadow: var(--theme-form-focus-box-shadow);
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
