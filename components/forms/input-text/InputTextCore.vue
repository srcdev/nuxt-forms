<template>
  <div
    class="input-text-wrapper"
    :data-form-theme="formTheme"
    :data-size="size"
    :class="[{ dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]"
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

// const props = defineProps({
const { type, inputmode, maxlength, id, name, placeholder, required, fieldHasError, styleClassPassthrough, theme, ariaDescribedby, size } = defineProps({
  type: {
    // type: String as PropType<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>,
    type: String,
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
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel();
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');

const inputPattern = computed(() => {
  return inputmode === 'numeric' ? '[0-9]+' : undefined;
});

const updateFocus = (isFocused: boolean) => {
  isActive.value = isFocused;
};

const inputField = ref<HTMLInputElement | null>(null);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

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
  updateElementClasses(['deep-bristol', 'deep-london', 'deep-bath']);
  if (inputmode === 'numeric') validateInput();
});
</script>

<style lang="css">
.input-text-wrapper {
  --_focus-box-shadow: var(--box-shadow-off);

  display: flex;
  align-items: center;

  background-color: var(--theme-form-input-bg);
  border-radius: var(--form-element-border-width);
  border: var(--form-element-border-width) solid var(--theme-form-input-border);
  outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  box-shadow: var(--_focus-box-shadow);

  &:not(:has(.btn)) {
    .slot {
      display: inline-block;
      padding-inline: 0.8rem;

      .icon {
        color: var(--theme-form-input-text);
        aspect-ratio: 1;
        height: var(--form-icon-size);
        width: var(--form-icon-size);
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  }

  &:has(.btn) {
    .btn {
      margin-inline: 0.6rem;
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

  &:not(.has-left-slot) {
    padding-inline-start: var(--form-text-padding-inline);
  }

  &:focus-within {
    box-shadow: var(--box-shadow-on);
    /* --_theme-form-input-outline-focus: hsl(from var(--_theme-form-input-outline-focus) h s 50%); */
    outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    /* outline: var(--form-element-outline-width) solid white; */
  }

  .input-text-core {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    color: var(--theme-form-input-text);
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

    /* WTH is --_focus-box-shadow undefined when attempting update here?? */
    /*
    &:focus-visible {
      --_focus-box-shadow: var(--box-shadow-on);
    }
    */
  }
}

input:autofill,
input:-internal-autofill-selected,
input:-webkit-autofill-strong-password,
input:-webkit-autofill-strong-password-viewable,
input:-webkit-autofill-and-obscured {
  background-color: var(--theme-form-input-bg) !important;
  background-image: none !important;
  color: var(--theme-form-input-text) !important;
  -webkit-box-shadow: 0 0 0rem 1000px var(--theme-form-input-bg) inset;
  -webkit-text-fill-color: var(--theme-form-input-text);
  transition: background-color 5000s ease-in-out 0s;
}
</style>
