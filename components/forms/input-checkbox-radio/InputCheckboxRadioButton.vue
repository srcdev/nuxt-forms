<template>
  <div class="input-checkbox-radio-options-button" :data-theme="formTheme" :data-size="size" :class="[size, elementClasses, optionsLayout, { error: fieldHasError }]">
    <InputCheckboxRadioCore :isButton="true" :type :id :name :required v-model="modelValue" :size :trueValue :falseValue :fieldHasError :theme :ariaDescribedby :displayAsDisc>
      <template #checkedIcon>
        <slot name="checkedIcon"></slot>
      </template>
    </InputCheckboxRadioCore>
    <label v-if="hasLabelContent" class="input-checkbox-radio-options-button-label" :for="id">
      <slot name="labelContent"></slot>
    </label>
    <label v-else class="input-checkbox-radio-options-button-label" :for="id">{{ label }}</label>
    <div class="decorator-icon">
      <slot name="itemIcon">
        <Icon name="material-symbols:add-2" class="icon" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
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
  displayAsDisc: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const hasLabelContent = computed(() => slots.labelContent !== undefined);
const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const modelValue = defineModel();

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const flexDirection = ref(props.direction);
</script>

<style lang="css">
.input-checkbox-radio-options-button {
  --_white-space: wrap;

  display: flex;
  flex-direction: v-bind(flexDirection);
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background-color: color-mix(in srgb, currentColor 5%, transparent);
  border-radius: 1lh;
  border: 0.1rem solid var(--theme-input-border);
  outline: 0.1rem solid hsl(from var(--theme-input-border) h s 55%);

  box-shadow: 0.1rem 0.1rem 0.8rem 0.1rem transparent;
  padding-block: var(--input-checkbox-radio-options-padding-block);
  padding-inline: var(--input-checkbox-radio-options-padding-inline);

  &:hover {
    background-color: var(--theme-input-surface-hover);
    border: 0.1rem solid var(--theme-input-border);
    outline: 0.1rem solid hsl(from var(--theme-input-border) h s 5%);
  }

  &.inline {
    --_white-space: nowrap;
  }

  &:has(.input-checkbox-radio-core:focus-visible) {
    box-shadow: var(--theme-focus-visible-shadow-medium);
    outline: var(--theme-focus-visible-outline);
  }

  /* Sizes */
  &.x-small {
    padding-block: 0.2rem;
    padding-inline: 1.6rem;
    gap: 1rem;
  }
  &.small {
    padding-block: 0.2rem;
    padding-inline: 1.6rem;
    gap: 1rem;
  }
  &.default {
    padding-block: 0.4rem;
    padding-inline: 1.2rem;
    gap: 1rem;
  }
  &.medium {
    padding-block: 0.4rem;
    padding-inline: 1.2rem;
    gap: 1rem;
  }
  &.large {
    padding-block: 0.4rem;
    padding-inline: 1.2rem;
    gap: 1rem;
  }

  .input-checkbox-radio-options-button-label {
    display: flex;
    flex-grow: 1;
    color: var(--theme-checkbox-label-text-color);
    font-size: var(--form-element-font-size);
    width: 100%;
    min-height: var(--form-element-line-height);
    align-items: center;
    justify-content: center;
    margin-block: 0.8rem;
    padding-inline: 0.8rem;
    white-space: var(--_white-space);

    &:hover {
      cursor: pointer;
    }
  }

  .decorator-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--theme-checkbox-symbol-color);

    .icon {
      height: var(--theme-checkbox-decorator-icon-size);
      width: var(--theme-checkbox-decorator-icon-size);
    }
  }
}
</style>
