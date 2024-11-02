<template>
  <div class="input-number-wrapper" :class="elementClasses">
    <div v-if="hasLeftContent" class="slot left">
      <slot name="left"></slot>
    </div>

    <div class="input-number-container">
      <input
        type="number"
        :id
        :name
        :required
        :min
        :max
        :step
        :class="['input-number-core', `input-number--${theme}`, `input-number--${size}`, `input-number--${weight}`, styleClassPassthrough]"
        v-model="modelValue"
        ref="inputField"
        inputmode="numeric"
      />
    </div>
    <div v-if="hasRightContent" class="slot right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const { id, name, required, min, max, step, theme, size, weight, styleClassPassthrough } = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    default: 1,
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
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
  weight: {
    type: String as PropType<string>,
    default: 'wght-400',
    validator(value: string) {
      return propValidators.weight.includes(value);
    },
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel<number | readonly number[]>();

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);
const minLength = computed(() => max.toString().length);

onMounted(() => {
  updateElementClasses(['number-1']);
});
</script>

<style lang="css">
.input-number-wrapper {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_gutter: 12px;
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);
  --_input-bg-color: white;
  --_input-text-color: var(--brand-grayscale-text-form);
  --_min-width: v-bind(minLength);

  display: flex;
  align-items: center;

  /* background-color: var(--_input-bg-color);
  border-radius: var(--input-border-width-default);
  border: var(--_border-width) solid var(--_border-color); */
  width: fit-content;

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
  }

  &.error {
    --_form-theme: var(--theme-error);
    --_input-text-color: var(--theme-error);
  }

  /* &:focus-within {
    --_border-color: white;

    outline: var(--focus-visible-outline);
    box-shadow: var(--focus-visible-box-shadow);
  } */

  .slot {
    display: inline-block;
    padding-inline: 8px;

    .icon {
      font-weight: 900;
    }
  }

  &.has-left-slot {
    .left-slot {
      display: flex;
      align-items: center;
    }
  }

  &.has-right-slot {
    .right-slot {
      display: flex;
      align-items: center;
    }
  }

  .input-number-core {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;

    background-color: var(--_input-bg-color);
    border-radius: var(--input-border-width-default);
    border: var(--_border-width) solid var(--_border-color);

    color: var(--_input-text-color);
    font-family: var(--font-family);
    font-size: var(--theme-form-button-font-size-normal);
    line-height: var(--line-height);
    padding: 4px 16px;
    text-align: center;
    min-width: var(--_min-width);

    &:focus-visible {
      --_border-color: white;

      outline: var(--focus-visible-outline);
      box-shadow: var(--focus-visible-box-shadow);
    }

    &::placeholder,
    &::-webkit-input-placeholder {
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-style: italic;
      font-weight: 400;
    }
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:autofill,
input:-webkit-autofill-strong-password,
input:-webkit-autofill-strong-password-viewable,
input:-webkit-autofill-and-obscured {
  background-color: var(--_input-bg-color) !important;
  background-image: none !important;
  color: var(--_input-text-color) !important;
  -webkit-box-shadow: 0 0 0px 1000px var(--_input-bg-color) inset;
  /* -webkit-text-fill-color: black; */
  transition: background-color 5000s ease-in-out 0s;
}
</style>
