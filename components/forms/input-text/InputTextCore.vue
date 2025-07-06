<template>
  <div
    class="input-text-wrapper"
    :data-form-theme="formTheme"
    :data-size="size"
    :data-inputmode="inputmode"
    :class="[inputVariant, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]"
  >
    <span v-if="hasLeftSlot" class="slot left-slot">
      <slot name="left"></slot>
    </span>

    <input
      :type
      :placeholder
      :id
      :name
      :required
      :maxlength
      :class="['input-text-core', elementClasses, { dirty: isDirty }, { active: isActive }]"
      v-model="modelValue"
      ref="inputField"
      :aria-invalid="fieldHasError"
      :aria-describedby
      :pattern="inputPattern"
      :inputmode
      @focusin="updateFocus(true)"
      @focusout="updateFocus(false)"
    />

    <span v-if="hasRightSlot" class="slot right-slot">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
  type: {
    type: String as PropType<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>,
    // type: String,
    default: 'text',
    validator(value: string) {
      return propValidators.inputTypesText.includes(value);
    },
  },
  inputmode: {
    type: String as PropType<'text' | 'email' | 'tel' | 'url' | 'search' | 'numeric' | 'none' | 'decimal'>,
    default: 'text',
    validator(value: string) {
      return propValidators.inputMode.includes(value);
    },
  },
  maxlength: {
    type: Number,
    default: 255,
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
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  fieldHasError: {
    type: Boolean,
    default: false,
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
  ariaDescribedby: {
    type: String,
    default: null,
  },
  size: {
    type: String as PropType<string>,
    default: 'default',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  inputVariant: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.inputVariant.includes(value);
    },
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel();
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');

const inputPattern = computed(() => {
  return props.inputmode === 'numeric' ? '[0-9]+' : undefined;
});

const updateFocus = (isFocused: boolean) => {
  isActive.value = isFocused;
};

const inputField = ref<HTMLInputElement | null>(null);

const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

// TODO: Move this to a utility function to allow removeEventListener on unmounted
// Leaving like this could lead to memory leaks
const validateInput = () => {
  if (inputField.value !== null) {
    inputField.value.addEventListener('beforeinput', (event: any) => {
      let beforeValue = modelValue.value;
      event.target.addEventListener(
        'input',
        () => {
          if (inputField.value !== null && inputField.value.validity.patternMismatch) {
            inputField.value.value = beforeValue as string;
          }
        },
        { once: true }
      );
    });
  }
};

onMounted(() => {
  if (props.inputmode === 'numeric') validateInput();
});
</script>

<style lang="css">
.input-text-wrapper {
  background-color: var(--element-decorator-background-color);
  outline: var(--element-decorator-outline-default);

  border-top-left-radius: var(--element-decorator-border-top-left-radius);
  border-top-right-radius: var(--element-decorator-border-top-right-radius);
  border-bottom-left-radius: var(--element-decorator-border-bottom-left-radius);
  border-bottom-right-radius: var(--element-decorator-border-bottom-right-radius);

  border-top: var(--element-decorator-border-top-default);
  border-right: var(--element-decorator-border-right-default);
  border-bottom: var(--element-decorator-border-bottom-default);
  border-left: var(--element-decorator-border-left-default);

  padding-inline: var(--element-decorator-padding-inline);

  &:hover {
    /* background-color: lab(89.6502 -0.829279 -2.45323 / 0.1); */
    background-color: hsl(from var(--theme-form-input-border) h s 20%);
  }

  display: flex;
  align-items: center;
  gap: 12px;

  .slot {
    display: flex;
    place-items: center;
    background-clip: padding-box;

    &.left-slot {
      /* background-color: green; */
    }
    &.right-slot {
      /* background-color: orange; */
    }
  }

  .input-text-core {
    all: unset;
    flex-grow: 1;

    font-family: var(--font-family);
    font-size: var(--form-element-font-size);
    line-height: var(--form-element-line-height);
    padding-block: var(--input-element-padding-block);
    padding-inline: var(--input-element-padding-inline);

    &::placeholder {
      color: var(--input-placeholder-color);
      font-size: var(--input-placeholder-font-size);
      font-style: var(--input-placeholder-font-style);
      line-height: var(--input-placeholder-line-height);
      font-weight: var(--input-placeholder-font-weight);
    }
  }
}

.input-text-wrapper-XXX {
  --_focus-box-shadow: var(--box-shadow-off);
  --_input-text-core-color: var(--theme-form-input-text-color-normal);

  --_input-text-wrapper-background-color: var(--theme-form-input-bg-normal);

  --_input-text-wrapper-border: var(--form-element-border-width) solid var(--theme-form-input-border);
  --_input-text-wrapper-border-radius: var(--form-input-border-radius);

  --_input-text-wrapper-outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  --_input-text-wrapper-opacity: 1;
  --_input-text-wrapper-box-shadow: var(--_focus-box-shadow);
  --_input-text-wrapper-margin-inline: 0;
  --_input-text-wrapper-padding-block: 0;

  &.underlined {
    --_input-text-core-color: var(--theme-form-input-text-color-underlined);
    --_input-text-wrapper-background-color: transparent;
    --_input-text-wrapper-padding-block: 0.5rem;
  }

  &.outlined {
    --_input-text-wrapper-margin-inline: 1px;
    --_input-text-wrapper-background-color: var(--theme-form-input-bg-outlined);
  }

  &.normal {
    &:focus-within {
      --_input-text-wrapper-box-shadow: var(--box-shadow-on);
      --_input-text-wrapper-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    }
  }

  &:not(.normal) {
    --_input-text-wrapper-border: none;
    --_input-text-wrapper-box-shadow: none;
    --_input-text-wrapper-outline: none;
    --_input-text-wrapper-opacity: 0;

    &:focus {
      --_input-text-wrapper-border: none;
      --_input-text-wrapper-box-shadow: none;
      --_input-text-wrapper-outline: none;
      --_input-text-wrapper-background-color: transparent;
    }

    &:focus-within {
      --_input-text-wrapper-border: none;
      --_input-text-wrapper-box-shadow: none;
      --_input-text-wrapper-outline: none;
      --_input-text-wrapper-background-color: transparent;
    }

    &.active,
    &.dirty {
      --_input-text-wrapper-border: none;
      --_input-text-wrapper-box-shadow: none;
      --_input-text-wrapper-outline: none;
      --_input-text-wrapper-background-color: transparent;

      --_input-text-wrapper-opacity: 1;
    }
  }

  display: flex;
  align-items: center;

  background-color: var(--_input-text-wrapper-background-color);
  border-radius: var(--_input-text-wrapper-border-radius);
  border: var(--_input-text-wrapper-border);
  outline: var(--_input-text-wrapper-outline);
  box-shadow: var(--_input-text-wrapper-box-shadow);
  opacity: var(--_input-text-wrapper-opacity);

  margin-inline: var(--_input-text-wrapper-margin-inline);
  padding-block: var(--_input-text-wrapper-padding-block);

  &:not(.normal) {
    transition: opacity 0.2s ease-in-out;
  }

  &:not(:has(.input-button-core)) {
    .slot {
      display: inline-block;

      .icon {
        color: var(--_input-text-core-color);
        aspect-ratio: 1;
        height: var(--form-icon-size);
        width: var(--form-icon-size);
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  }

  &.has-left-slot {
    .left-slot {
      display: flex;
      align-items: center;
      margin-inline-start: 1rem;
    }
  }

  &.has-right-slot {
    .right-slot {
      display: flex;
      align-items: center;
      margin-inline-end: 1rem;
    }
  }

  .input-text-core {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    color: var(--_input-text-core-color);
    font-family: var(--font-family);
    font-size: var(--form-element-font-size);
    line-height: var(--form-element-line-height);

    padding-inline: var(--form-text-padding-inline);
    padding-block-start: var(--form-element-padding-block-start);
    padding-block-end: var(--form-element-padding-block-end);

    &::placeholder,
    &::-webkit-input-placeholder {
      font-family: var(--font-family);
      font-size: var(--form-element-font-size);
      font-style: italic;
      font-weight: 400;
    }
  }

  &:has(.has-left-button),
  &:has(.has-right-button) {
    .slot {
      .input-button-core {
        border: initial;
        border-radius: 0;
        outline: initial;
        box-shadow: unset;
      }
    }

    .left-slot {
      margin-inline-end: 0;
      border-right: 2px solid var(--theme-btn-bg-hover);
    }

    .right-slot {
      margin-inline-end: 0;
      border-left: 2px solid var(--theme-btn-bg-hover);
    }
  }
}

input:autofill,
input:-internal-autofill-selected,
input:-webkit-autofill-strong-password,
input:-webkit-autofill-strong-password-viewable,
input:-webkit-autofill-and-obscured {
  background-color: var(--theme-form-input-bg-normal) !important;
  background-image: none !important;
  color: var(--_input-text-core-color) !important;
  -webkit-box-shadow: 0 0 0rem 1000px var(--theme-form-input-bg-normal) inset;
  -webkit-text-fill-color: var(--_input-text-core-color);
  transition: background-color 5000s ease-in-out 0s;
}
</style>
