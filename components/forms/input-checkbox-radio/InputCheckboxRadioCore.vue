<template>
  <div
    class="input-checkbox-radio-wrapper"
    :data-form-theme="formTheme"
    :data-theme="size"
    :class="[type, size, elementClasses, { error: fieldHasError }, { button: isButton }, { 'display-as-disc': displayAsDisc }]"
  >
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
      :aria-invalid="fieldHasError"
    />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
const props = defineProps({
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
  displayAsDisc: {
    type: Boolean,
    default: false,
  },
});

const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel<any>();

const inputField = ref<HTMLInputElement | null>(null);

const defaultIcon = computed(() => {
  return props.type === 'checkbox' ? 'material-symbols:check-small' : 'material-symbols:circle';
});

const isArray = Array.isArray(modelValue.value);

const isChecked = computed(() => {
  if (isArray) {
    return modelValue.value.includes(props.trueValue);
  } else {
    return modelValue.value === props.trueValue;
  }
});
</script>

<style lang="css">
.input-checkbox-radio-wrapper {
  display: grid;
  grid-template-areas: 'element-stack';
  place-content: center;

  background-color: var(--input-checkbox-radio-wrapper-background-color);
  border: var(--input-checkbox-radio-wrapper-border);
  border-radius: var(--input-checkbox-radio-wrapper-border-radius);
  outline: var(--input-checkbox-radio-wrapper-outline);
  box-shadow: var(--_box-shadow);

  height: var(--form-input-checkbox-radio-button-symbol-size);
  width: var(--form-input-checkbox-radio-button-symbol-size);

  transition: all 0.2s ease-in-out;

  &:not(.button):has(.input-checkbox-radio-core:focus-visible) {
    border: var(--input-checkbox-radio-wrapper-border-on);
    outline: var(--input-checkbox-radio-wrapper-outline-on);
    box-shadow: var(--input-checkbox-radio-wrapper-box-shadow-on);
  }

  .input-checked-icon {
    grid-area: element-stack;
    color: var(--theme-form-checkbox-symbol);
    height: var(--form-input-checkbox-radio-button-symbol-size);
    width: var(--form-input-checkbox-radio-button-symbol-size);
    box-shadow: var(--_box-shadow);
    color: red;
  }

  .input-checkbox-radio-core {
    grid-area: element-stack;
    appearance: none;
    margin: 0;
    overflow: hidden;
    opacity: 0;

    height: var(--form-input-checkbox-radio-button-symbol-size);
    width: var(--form-input-checkbox-radio-button-symbol-size);

    &:hover {
      cursor: pointer;
    }

    &:not(.is-button) {
      &:focus-visible {
        border: var(--input-checkbox-radio-wrapper-border-on);
        outline: var(--input-checkbox-radio-wrapper-outline-on);
        box-shadow: var(--input-checkbox-radio-wrapper-box-shadow-on);
      }
    }
  }
}
</style>
