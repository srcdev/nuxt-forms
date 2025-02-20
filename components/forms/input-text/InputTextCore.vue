<template>
  <div
    class="input-text-wrapper"
    :data-form-theme="formTheme"
    :data-size="size"
    :class="[{ isMaterial: isMaterial }, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]"
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
    default: 'normal',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  isMaterial: {
    type: Boolean,
    default: false,
  },
});

console.log('isMaterial: ', props.isMaterial);

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
  --_focus-box-shadow: var(--box-shadow-off);

  display: flex;
  align-items: center;

  background-color: var(--theme-form-input-bg);
  border-radius: var(--form-element-border-width);
  border: var(--form-element-border-width) solid var(--theme-form-input-border);
  outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  box-shadow: var(--_focus-box-shadow);

  &:not(:has(.input-button-core)) {
    .slot {
      display: inline-block;

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

  &:focus-within {
    box-shadow: var(--box-shadow-on);
    outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
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
   :has(:has( }
    */
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

  /* Material Design Styles */

  &.isMaterial {
    background-color: transparent;
    border-radius: initial;
    border: none;
    outline: none;
    box-shadow: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    &.active,
    &.dirty {
      opacity: 1;
    }
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
