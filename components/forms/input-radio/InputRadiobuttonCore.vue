<template>
  <div class="input-radiobutton-wrapper" :data-form-theme="formTheme" :class="[size, { error: fieldHasError }]">
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
    <div class="input-radiobutton-decorator" :class="[size]">
      <Icon :name="icon" class="icon" />
    </div>
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
</script>

<style scoped lang="css">
.input-radiobutton-wrapper {
  --_checkbox-size: initial;
  --_outline-width: var(--input-outline-width-thin);
  --_border-width: var(--input-border-width-default);
  --_box-shadow: none;

  display: grid;
  grid-template-areas: 'element-stack';
  height: var(--_checkbox-size);
  width: var(--_checkbox-size);
  overflow: hidden;

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
    --_padding: 5px;
    display: grid;
    grid-area: element-stack;
    background-color: var(--theme-form-checkbox-bg);
    border-radius: 100%;
    place-content: center;
    position: relative;
    height: var(--_checkbox-size);
    width: var(--_checkbox-size);
    z-index: -1;

    .icon {
      grid-area: stack;
      color: var(--theme-form-radio-symbol);
      height: var(--_checkbox-size);
      width: var(--_checkbox-size);
      box-shadow: var(--_box-shadow);
      outline: 1px solid yellow;
    }
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

    &:checked::after {
      display: grid;
      font-family: var(--font-family);
      place-content: center;
      font-size: calc(var(--_checkbox-size) * 0.75);
    }
  }
}
</style>
