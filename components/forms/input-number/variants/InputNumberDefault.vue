<template>
  <div class="input-number-with-label" :data-form-theme="formTheme" :class="[elementClasses, `theme-${theme}`, { error: fieldHasError }]">
    <label class="input-number-label body-normal-bold" :for="id">{{ label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>

    <InputNumberCore v-model="modelValue" :id :name :min :max :step :theme :required :size :weight :fieldHasError>
      <template v-if="hasLeftContent" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateValue(-step, Number(modelValue) > min)"
          :readonly="Number(modelValue) <= min"
          :is-pending="false"
          buttonText="Step down"
          theme="primary"
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
          @click.stop.prevent="updateValue(step, Number(modelValue) < max)"
          :readonly="Number(modelValue) >= max"
          :is-pending="false"
          buttonText="Step up"
          theme="primary"
          size="x-small"
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputNumberCore>
    <InputError :errorMessage :fieldHasError :id :isDetached="true" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const { id, name, label, required, min, max, step, theme, size, weight, styleClassPassthrough, errorMessage, fieldHasError } = defineProps({
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
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<number | readonly number[]>();

const updateValue = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};
</script>

<style lang="css">
.input-number-with-label {
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-outline-width-thin);
  --_label-padding-inline: 10px;

  .input-number-label {
    display: block;
    margin-block: 8px;

    &:hover {
      cursor: pointer;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 16px;
    margin-top: 12px;
  }
}
</style>
