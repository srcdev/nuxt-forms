<template>
  <div class="input-radiobutton-wrapper" :data-form-theme="formTheme" :class="[size, { error: fieldHasError }]">
    <Icon :name="icon" class="input-radiobutton-decorator" />
    <input
      type="radio"
      :true-value="trueValue"
      :false-value="falseValue"
      :id
      :name
      :required="required && !multipleOptions"
      :value="trueValue"
      class="input-radiobutton-core"
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
      checked: 'carbon:radio-button-checked',
      unchecked: 'carbon:radio-button',
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

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);
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

const useCustomizeIcon = (content: string, name: string, prefix: string, provider: string) => {
  console.log('useCustomizeIcon');
  // if (prefix !== 'carbon') return content; // Ignore Prefix

  return content
    .replace(/stroke-width="[^"]*"/g, `stroke-width="2"`) // Change stroke width to 2
    .replace(/stroke="[^"]*"/g, `stroke="#ff0000"`) // Change stroke color to red
    .replace(/fill="[^"]*"/g, `fill="#00ff00"`) // Change fill color to green
    .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`) // Change animation duration to 1s (for animated icons)
    .replace(/opacity="[^"]*"/g, `opacity="0.8"`); // Change opacity to 0.8
};
</script>

<style scoped lang="css">
.input-radiobutton-wrapper {
  --_checkbox-size: initial;
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-default);
  --_box-shadow: none;

  display: grid;
  grid-template-areas: 'element-stack';

  background-color: var(--theme-form-radio-bg);
  border-radius: 50%;

  &:has(.input-radiobutton-core:focus-visible) {
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

  .input-radiobutton-decorator {
    grid-area: element-stack;
    color: var(--theme-form-radio-symbol);
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    box-shadow: var(--_box-shadow);
  }

  .input-radiobutton-core {
    grid-area: element-stack;
    appearance: none;
    margin: 0;
    overflow: hidden;
    opacity: 0;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      border: var(--_border-width) solid var(--theme-form-input-border);
      outline: var(--_outline-width) solid hsl(from var(--theme-form-input-outline) h s 50%);
    }
  }
}
</style>
