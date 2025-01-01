<template>
  <div class="input-checkbox-radio-wrapper" :data-form-theme="formTheme" :class="[type, size, elementClasses, { error: fieldHasError }, { button: isButton }]">
    <slot name="checkedIcon" v-if="isChecked">
      <Icon :name="defaultIcon" class="input-checked-icon" />
    </slot>

    <input
      :type
      :true-value
      :false-value
      :id
      :name
      :required="required && !multipleOptions"
      :value="trueValue"
      class="input-checkbox-radio-core"
      :class="[size, { error: fieldHasError }, { 'is-button': isButton }]"
      v-model="modelValue"
      ref="inputField"
      :aria-checked="isChecked"
      :aria-describedby
    />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
const { isButton, type, id, name, required, trueValue, falseValue, multipleOptions, theme, styleClassPassthrough, size, fieldHasError, ariaDescribedby } = defineProps({
  isButton: {
    type: Boolean,
    default: false,
  },
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
  required: {
    type: Boolean,
    value: false,
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  multipleOptions: {
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
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  ariaDescribedby: {
    type: String,
    default: null,
  },
});

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<any>();

const inputField = ref<HTMLInputElement | null>(null);

const defaultIcon = computed(() => {
  return type === 'checkbox' ? 'material-symbols:check-small' : 'material-symbols:circle';
});

const isArray = Array.isArray(modelValue.value);

const isChecked = computed(() => {
  if (isArray) {
    return modelValue.value.includes(trueValue);
  } else {
    return modelValue.value === trueValue;
  }
});
</script>

<style lang="css">
.input-checkbox-radio-wrapper {
  --_checkbox-size: initial;
  --_outline-width: 0.1rem;
  --_border-width: 0.1rem;
  --_border-radius: 50%;
  --_background-color: var(--theme-form-checkbox-bg);
  --_box-shadow: none;

  &:not(.button) {
    --_outline-width: var(--form-element-outline-width);
    --_border-width: var(--form-element-border-width);
    &.checkbox {
      --_background-color: var(--theme-form-checkbox-bg);
      --_border-color: var(--theme-form-checkbox-border);
      --_border-radius: 0.4rem;
      --_outline-color: var(--theme-form-checkbox-outline);
    }

    &.radio {
      --_background-color: var(--theme-form-radio-bg);
      --_border-color: var(--theme-form-radio-border);
      --_border-radius: 50%;
      --_outline-color: var(--theme-form-radio-outline);
    }
  }

  display: grid;
  grid-template-areas: 'element-stack';
  place-content: center;

  background-color: var(--_background-color);
  border: var(--_border-width) solid var(--_border-color);
  border-radius: var(--_border-radius);
  outline: 0.1rem solid var(--_outline-color);
  box-shadow: var(--_box-shadow);

  height: var(--_checkbox-size);
  width: var(--_checkbox-size);

  transition: all 0.2s ease-in-out;

  &:not(.button):has(.input-checkbox-radio-core:focus-visible) {
    --_box-shadow: var(--form-focus-box-shadow);
  }

  /* Sizes */
  &.x-small {
    --_checkbox-size: 2rem;
  }
  &.small {
    --_checkbox-size: 2.4rem;
  }
  &.normal {
    --_checkbox-size: 3.4rem;
  }
  &.medium {
    --_checkbox-size: 4rem;
  }
  &.large {
    --_checkbox-size: 4.4rem;
  }

  .input-checked-icon {
    grid-area: element-stack;
    color: var(--theme-form-checkbox-symbol);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    box-shadow: var(--_box-shadow);
  }

  .input-checkbox-radio-core {
    grid-area: element-stack;
    appearance: none;
    margin: 0;
    overflow: hidden;
    opacity: 0;

    height: var(--_checkbox-size);
    width: var(--_checkbox-size);

    &:hover {
      cursor: pointer;
    }

    &:not(.is-button) {
      &:focus-visible {
        --_box-shadow: var(--form-focus-box-shadow);
      }
    }
  }
}
</style>
