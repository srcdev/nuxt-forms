<template>
  <div class="input-range-fancy-with-label" :data-form-theme="formTheme" :class="[elementClasses, { error: fieldHasError }]">
    <label class="input-range-fancy-label body-normal-bold" :for="id">{{ label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>

    <InputRangeFancyCore v-model="modelValue" :id :name :rangeLowLabel :rangeHighLabel :min :max :step :theme :required :size :weight :fieldHasError />
    <InputError :errorMessage :showError="fieldHasError" :id :isDetached="true" :styleClassPassthrough="['mbe-20']" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { id, name, label, rangeLowLabel, rangeHighLabel, required, min, max, step, theme, size, weight, styleClassPassthrough, errorMessage, fieldHasError } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  rangeLowLabel: {
    type: String,
    required: true,
  },
  rangeHighLabel: {
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
  errorMessage: {
    type: [Object, String],
    required: true,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
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
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  deepCssClassPassthrough: {
    type: String,
    default: '',
  },
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<number | readonly number[]>();
</script>

<style lang="css">
.input-range-fancy-with-label {
  .input-range-fancy-label {
    display: block;
    margin-block: 0.8rem;

    &:hover {
      cursor: pointer;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 1.6rem;
    margin-top: 1.2rem;
  }
}
</style>
