<template>
  <div class="input-checkbox-radio-button-button" :data-form-theme="formTheme" :class="[size, elementClasses, optionsLayout, { error: fieldHasError }]">
    <InputCheckboxRadioCore :isButton="true" :type :id :name :required v-model="modelValue" :size :trueValue :falseValue :fieldHasError :theme>
      <template #checkedIcon>
        <slot name="checkedIcon"></slot>
      </template>
    </InputCheckboxRadioCore>
    <label v-if="hasLabelContent" class="input-checkbox-radio-button-label body-normal" :for="id">
      <slot name="labelContent"></slot>
    </label>
    <label v-else class="input-checkbox-radio-button-label body-normal-semibold" :for="id">{{ label }}</label>
    <div class="item-icon">
      <slot name="itemIcon">
        <Icon name="material-symbols:add-2" class="icon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { type, id, name, label, required, fieldHasError, trueValue, falseValue, size, optionsLayout, styleClassPassthrough, theme, direction } = defineProps({
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
  --_checkbox-size: initial;
  --_background-color: var(--theme-checkbox-radio-button-bg-default);
  --_outline-width: var(--input-outline-width-thin);
  --_border-color: var(--theme-checkbox-radio-button-border-default);
  --_outline-color: var(--theme-checkbox-radio-button-outline-default);
  --_label-color: var(--theme-checkbox-radio-button-label-default);
  --_box-shadow: none;
  --_white-space: wrap;
  --_gap: 4px;
  --_border-radius: 22px;
  --_padding-block: 4px;
  --_padding-inline: 12px;

  display: flex;
  flex-direction: v-bind(flexDirection);
  align-items: center;
  justify-content: space-between;
  gap: var(--_gap);

  background-color: var(--_background-color);
  border-radius: var(--_border-radius);
  border: var(--theme-checkbox-radio-button-border-width) solid var(--_border-color);
  outline: var(--theme-checkbox-radio-button-outline-width) solid var(--_outline-color);
  box-shadow: var(--_box-shadow);
  padding-block: var(--_padding-block);
  padding-inline: var(--_padding-inline);

  &.inline {
    --_white-space: nowrap;
  }

  /* Sizes */
  &.x-small {
    --_checkbox-size: 20px;
    --_gap: 10px;
    --_border-radius: 20px;
    --_padding-block: 2px;
    --_padding-inline: 16px;
  }
  &.small {
    --_checkbox-size: 22px;
    --_gap: 12px;
    --_border-radius: 18px;
    --_padding-block: 0px;
    --_padding-inline: 12px;
  }
  &.normal {
    --_checkbox-size: 34px;
    --_gap: 10px;
    --_border-radius: 20px;
    --_padding-block: 4px;
    --_padding-inline: 12px;
  }
  &.medium {
    --_checkbox-size: 34px;
    --_gap: 10px;
    --_border-radius: 20px;
    --_padding-block: 4px;
    --_padding-inline: 12px;
  }
  &.large {
    --_checkbox-size: 34px;
    --_gap: 10px;
    --_border-radius: 20px;
    --_padding-block: 4px;
    --_padding-inline: 12px;
  }
}

.input-checkbox-radio-button-label {
  display: flex;
  flex-grow: 1;
  color: var(--_label-color);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-block: 8px;
  padding-inline: 8px;
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
  height: var(--_checkbox-size);
  width: var(--_checkbox-size);
}
</style>
