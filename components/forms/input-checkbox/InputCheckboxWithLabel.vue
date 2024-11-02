<template>
  <div class="input-checkbox-with-label" :class="[elementClasses, optionsLayout, { error: fieldHasError }]">
    <InputCheckboxCore :id :name :required v-model="modelValue" :size :trueValue :falseValue :checkboxAppearance :checkboxStyle :fieldHasError />
    <label v-if="hasLabelContent" class="input-checkbox-label body-normal" :for="id">
      <slot name="labelContent"></slot>
    </label>
    <label v-else class="input-checkbox-label body-normal-semibold" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { id, name, label, required, fieldHasError, trueValue, falseValue, size, checkboxAppearance, checkboxStyle, optionsLayout, styleClassPassthrough } = defineProps({
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
  required: {
    type: Boolean,
    default: false,
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  size: {
    type: String as PropType<string>,
    default: 'medium',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  checkboxAppearance: {
    type: String as PropType<string>,
    default: null,
    validator(value: string) {
      return propValidators.checkboxAppearance.includes(value);
    },
  },
  checkboxStyle: {
    type: String as PropType<string>,
    default: 'check',
    validator(value: string) {
      return propValidators.checkboxStyle.includes(value);
    },
  },
  optionsLayout: {
    type: String as PropType<string>,
    default: 'equal-widths',
    validator(value: string) {
      return propValidators.optionsLayout.includes(value);
    },
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasLabelContent = computed(() => slots.labelContent !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();
</script>

<style lang="css">
.input-checkbox-with-label {
  --_form-theme: var(--theme-form-primary);
  --_white-space: wrap;

  display: flex;
  align-items: center;

  &.error {
    --_form-theme: var(--theme-error);
  }

  &.inline {
    --_white-space: nowrap;
  }

  .input-checkbox-label {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-block: 8px;
    padding-inline: 8px;
    white-space: var(--_white-space);

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
