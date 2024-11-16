<template>
  <div class="input-checkbox-wrapper" :data-form-theme="formTheme" :class="[size, { error: fieldHasError }]">
    <Icon v-show="isChecked" name="material-symbols:check-small" class="input-checkbox-decorator" />
    <input
      type="checkbox"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="required && !multipleOptions"
      :value="trueValue"
      class="input-checkbox-core"
      :class="[size, { error: fieldHasError }]"
      v-model="modelValue"
      ref="inputField"
    />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
const { id, name, required, trueValue, falseValue, multipleOptions, theme, styleClassPassthrough, size, stateIcon, fieldHasError } = defineProps({
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
  stateIcon: {
    type: Object as PropType<{ checked: string; unchecked: string }>,
    default: {
      checked: 'carbon:checkbox-checked',
      unchecked: 'carbon:checkbox',
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
});

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<any>();

const inputField = ref<HTMLInputElement | null>(null);

const isArray = Array.isArray(modelValue.value);

const isChecked = computed(() => {
  if (isArray) {
    return modelValue.value.indexOf(trueValue) > -1;
  } else {
    return modelValue.value === trueValue;
  }
});

const icon = computed(() => {
  return isChecked.value ? stateIcon.checked : stateIcon.unchecked;
});
</script>

<style scoped lang="css">
.input-checkbox-wrapper {
  --_checkbox-size: initial;
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-default);
  --_border-color: var(--theme-form-checkbox-border);
  --_outline-color: var(--theme-form-checkbox-outline);
  --_box-shadow: none;

  display: grid;
  grid-template-areas: 'element-stack';
  place-content: center;

  background-color: var(--theme-form-checkbox-bg);
  border-radius: 4px;
  border: var(--_border-width) solid var(--_border-color);
  outline: 1px solid var(--_outline-color);
  box-shadow: var(--_box-shadow);

  height: var(--_checkbox-size);
  width: var(--_checkbox-size);

  &:has(.input-checkbox-core:focus-visible) {
    --_box-shadow: var(--theme-form-focus-box-shadow);
  }

  /* Sizes */
  &.x-small {
    --_checkbox-size: 20px;
  }
  &.small {
    --_checkbox-size: 24px;
  }
  &.normal {
    --_checkbox-size: 34px;
  }
  &.medium {
    --_checkbox-size: 40px;
  }
  &.large {
    --_checkbox-size: 44px;
  }

  .input-checkbox-decorator {
    grid-area: element-stack;
    color: var(--theme-form-checkbox-symbol);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    box-shadow: var(--_box-shadow);
  }

  .input-checkbox-core {
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

    &:focus-visible {
      --_box-shadow: var(--theme-form-focus-box-shadow);
    }
  }
}
</style>
