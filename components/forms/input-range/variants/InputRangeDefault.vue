<template>
  <div class="input-range-with-label" :data-form-theme="formTheme" :class="[elementClasses, { error: fieldHasError }]">
    <label class="input-range-label body-normal-bold" :for="id">{{ label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>

    <InputRangeCore v-model="modelValue" :id :name :min :max :step :theme :required :size :weight :fieldHasError>
      <template v-if="hasDataList" #datalist>
        <slot name="datalist"></slot>
      </template>
      <template v-if="hasLeftContent" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateRange(-step, Number(modelValue) > min)"
          :readonly="Number(modelValue) === min"
          :is-pending="false"
          buttonText="Step down"
          :theme
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
          @click.stop.prevent="updateRange(step, Number(modelValue) < max)"
          :readonly="Number(modelValue) === max"
          :is-pending="false"
          buttonText="Step up"
          :theme
          size="x-small"
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputRangeCore>
    <InputError :errorMessage :showError="fieldHasError" :id :isDetached="true" :styleClassPassthrough="['mbe-20']" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const { name, label, required, min, max, step, theme, size, weight, styleClassPassthrough, errorMessage, fieldHasError } = defineProps({
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
  deepCssClassPassthrough: {
    type: String,
    default: '',
  },
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const hasDataList = computed(() => slots.datalist !== undefined);
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const id = useId();
const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<number | readonly number[]>();

const updateRange = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};
</script>

<style lang="css">
.input-range-with-label {
  .input-range-label {
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
