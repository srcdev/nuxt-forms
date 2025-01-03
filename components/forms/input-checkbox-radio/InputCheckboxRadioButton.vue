<template>
  <div class="input-checkbox-radio-button-button" :data-form-theme="formTheme" :data-size="size" :class="[size, elementClasses, optionsLayout, { error: fieldHasError }]">
    <InputCheckboxRadioCore :isButton="true" :type :id :name :required v-model="modelValue" :size :trueValue :falseValue :fieldHasError :theme :ariaDescribedby>
      <template #checkedIcon>
        <slot name="checkedIcon"></slot>
      </template>
    </InputCheckboxRadioCore>
    <label v-if="hasLabelContent" class="input-checkbox-radio-button-label" :for="id">
      <slot name="labelContent"></slot>
    </label>
    <label v-else class="input-checkbox-radio-button-label" :for="id">{{ label }}</label>
    <div class="item-icon">
      <slot name="itemIcon">
        <Icon name="material-symbols:add-2" class="icon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { type, id, name, label, required, fieldHasError, trueValue, falseValue, size, optionsLayout, styleClassPassthrough, theme, direction, ariaDescribedby } = defineProps({
  type: {
    type: String as PropType<'checkbox' | 'radio'>,
    required: true,
  },
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
  theme: {
    type: String as PropType<string>,
    default: 'primary',
    validator(value: string) {
      return propValidators.theme.includes(value);
    },
  },
  direction: {
    type: String as PropType<'row' | 'row-reverse'>,
    default: 'row',
    validator(value: string) {
      return ['row', 'row-reverse'].includes(value);
    },
  },
  ariaDescribedby: {
    type: String,
    default: null,
  },
});

const slots = useSlots();
const hasLabelContent = computed(() => slots.labelContent !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const modelValue = defineModel();

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const flexDirection = ref(direction);
</script>

<style lang="css">
.input-checkbox-radio-button-button {
  /* --_checkbox-size: initial; */
  --_background-color: var(--theme-checkbox-radio-button-bg-default);
  --_outline-width: var(--form-element-outline-width);
  --_border-color: var(--theme-checkbox-radio-button-border-default);
  --_outline-color: var(--theme-checkbox-radio-button-outline-default);
  --_label-color: var(--theme-checkbox-radio-button-label-default);
  --_box-shadow: var(--theme-checkbox-radio-button-shadow);
  --_white-space: wrap;
  --_gap: 0.4rem;
  /* --_border-radius: 2.2rem; */
  --_padding-block: 0.4rem;
  --_padding-inline: 1.2rem;

  display: flex;
  flex-direction: v-bind(flexDirection);
  align-items: center;
  justify-content: space-between;
  gap: var(--_gap);

  background-color: var(--_background-color);
  border-radius: calc(var(--form-element-line-height) / 1);
  border: var(--theme-checkbox-radio-button-border-width) solid var(--_border-color);
  outline: var(--theme-checkbox-radio-button-outline-width) solid var(--_outline-color);
  box-shadow: 0.1rem 0.1rem 0.8rem 0.1rem var(--_box-shadow);
  padding-block: var(--_padding-block);
  padding-inline: var(--_padding-inline);

  &.inline {
    --_white-space: nowrap;
  }

  /* &:focus-within {
    --_box-shadow: var(--theme-checkbox-radio-button-shadow-focus);
    --_outline-color: var(--theme-checkbox-radio-button-outline-focus);
  } */

  &:has(.input-checkbox-radio-core:focus-visible) {
    --_box-shadow: var(--theme-checkbox-radio-button-shadow-focus);
    --_outline-color: var(--theme-checkbox-radio-button-outline-focus);
  }

  /* Sizes */
  &.x-small {
    /* --_checkbox-size: 2rem; */
    --_gap: 1rem;
    /* --_border-radius: 2rem; */
    --_padding-block: 0.2rem;
    --_padding-inline: 1.6rem;
  }
  &.small {
    /* --_checkbox-size: 2.2rem; */
    --_gap: 1.2rem;
    /* --_border-radius: 1.8rem; */
    --_padding-block: 0rem;
    --_padding-inline: 1.2rem;
  }
  &.normal {
    /* --_checkbox-size: 3.4rem; */
    --_gap: 1rem;
    /* --_border-radius: 2rem; */
    --_padding-block: 0.4rem;
    --_padding-inline: 1.2rem;
  }
  &.medium {
    /* --_checkbox-size: 3.4rem; */
    --_gap: 1rem;
    /* --_border-radius: 2rem; */
    --_padding-block: 0.4rem;
    --_padding-inline: 1.2rem;
  }
  &.large {
    /* --_checkbox-size: 3.4rem; */
    --_gap: 1rem;
    /* --_border-radius: 2rem; */
    --_padding-block: 0.4rem;
    --_padding-inline: 1.2rem;
  }
}

.input-checkbox-radio-button-label {
  display: flex;
  flex-grow: 1;
  color: var(--_label-color);
  font-size: var(--form-element-font-size);
  width: 100%;
  height: var(--form-element-line-height);
  align-items: center;
  justify-content: center;
  margin-block: 0.8rem;
  padding-inline: 0.8rem;
  white-space: var(--_white-space);

  &:hover {
    cursor: pointer;
  }
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--_border-color);
  height: var(--form-input-checkbox-radio-button-size);
  width: var(--form-input-checkbox-radio-button-size);
}
</style>
