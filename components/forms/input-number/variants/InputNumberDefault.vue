<template>
  <div class="input-number-with-label" :data-form-theme="formTheme" :data-size="size" :class="[elementClasses, `theme-${theme}`, { error: fieldHasError }]">
    <label class="input-number-label body-normal-bold" :for="id">{{ label }}</label>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>

    <InputNumberCore v-model="modelValue" :id :name :min :max :step :theme :required :size :weight :fieldHasError :styleClassPassthrough>
      <template v-if="hasLeftContent" #left>
        <InputButtonCore
          type="button"
          @click.stop.prevent="updateValue(-step, Number(modelValue) > min)"
          :readonly="Number(modelValue) <= min"
          :is-pending="false"
          buttonText="Step down"
          theme="input-action"
          :size
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
          theme="input-action"
          :size
        >
          <template #iconOnly>
            <slot name="right"></slot>
          </template>
        </InputButtonCore>
      </template>
    </InputNumberCore>
    <InputError :errorMessage :showError="fieldHasError" :id :isDetached="true" />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';

const props = defineProps({
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
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const id = useId();
const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel<number | readonly number[]>();

const updateValue = (step: number, withinRangeLimit: boolean) => {
  if (withinRangeLimit) {
    modelValue.value = (Number(modelValue.value) + step) as number;
  }
};

updateElementClasses(['has-left-button', 'has-right-button']);
</script>

<style lang="css">
.input-number-with-label {
  --_border-width: var(--form-element-border-width);
  --_outline-width: var(--form-element-outline-width);
  --_label-padding-inline: 1rem;

  .input-number-label {
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
