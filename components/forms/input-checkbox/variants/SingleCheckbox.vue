<template>
  <fieldset class="single-checkbox-fieldset" :class="[{ error: fieldHasError }]">
    <legend :class="[{ 'has-description': hasDescription }]">{{ legend }}</legend>
    <template v-if="hasDescription">
      <slot name="description"></slot>
    </template>
    <div class="single-checkbox-items" :class="[optionsLayout]">
      <InputCheckboxWithLabel :id :name :required :label :fieldHasError v-model="modelValue" :trueValue :falseValue :size :theme>
        <template #checkedIcon>
          <slot name="checkedIcon"></slot>
        </template>
        <template v-if="hasLabelContent" #labelContent>
          <slot name="labelContent"></slot>
        </template>
      </InputCheckboxWithLabel>
    </div>
    <InputError :errorMessage :fieldHasError :id="name" :isDetached="true" :styleClassPassthrough="inputErrorStyles" />
  </fieldset>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
import type { IFormMultipleOptions } from '@/types/types.forms';

const { id, name, legend, label, required, fieldHasError, errorMessage, size, optionsLayout, equalCols, trueValue, falseValue, styleClassPassthrough, theme } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  legend: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  errorMessage: {
    type: [Object, String],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  multipleOptions: {
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
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  optionsLayout: {
    type: String as PropType<string>,
    default: 'equal-widths',
    validator(value: string) {
      return propValidators.optionsLayout.includes(value);
    },
  },
  equalCols: {
    type: Boolean,
    default: true,
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
});

const slots = useSlots();
const hasDescription = computed(() => slots.description !== undefined);
const hasLabelContent = computed(() => slots.labelContent !== undefined);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();
const fieldData = defineModel('fieldData') as Ref<IFormMultipleOptions>;

const inputErrorStyles = ref<string[]>(styleClassPassthrough);

watchEffect(() => {
  if (!hasDescription.value && fieldHasError) {
    inputErrorStyles.value.push('mbs-12');
  } else {
    inputErrorStyles.value = inputErrorStyles.value.filter((style) => style !== 'mbs-12');
  }
});
</script>

<style lang="css">
.single-checkbox-fieldset {
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 500;

    &.has-description {
      margin-bottom: 0;
    }
  }

  .label-description {
    font-family: var(--font-family);
    font-size: 16px;
    margin-top: 12px;
  }
}

.single-checkbox-items {
  display: flex;
  gap: 12px;
  margin-top: 12px;

  &.inline {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &.block {
    flex-direction: column;
  }

  &.equal-widths {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}
</style>
