<template>
  <div
    class="input-text-wrapper"
    :data-form-theme="formTheme"
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
      :class="['input-text-core', 'text-normal', elementClasses, { dirty: isDirty }, { active: isActive }]"
      v-model="modelValue"
      ref="inputField"
      :aria-invalid="fieldHasError"
      :ariaDescribedby
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

const { type, inputmode, maxlength, id, name, placeholder, required, fieldHasError, styleClassPassthrough, theme, ariaDescribedby } = defineProps({
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
            console.log('you did some bad chars');
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
  --_gutter: 12px;
  --_border-width: var(--input-border-width-default);
  --_outline-width: var(--input-border-width-default);

  display: flex;
  align-items: center;

  background-color: var(--theme-form-input-bg);
  border-radius: var(--input-border-width-default);
  border: var(--_border-width) solid var(--theme-form-input-border);

  &:focus-within {
    border: var(--_border-width) solid var(--theme-form-input-border-focus);
    outline: var(--_outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 50%);
    box-shadow: var(--theme-form-focus-box-shadow);
  }

  &:not(:has(.btn)) {
    .slot {
      display: inline-block;
      padding-inline: 8px;

      .icon {
        color: var(--theme-form-input-text);
      }
    }
  }

  &:has(.btn) {
    .btn {
      margin-inline: 6px;
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

  .input-text-core {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    color: var(--theme-form-input-text);
    font-family: var(--font-family);
    font-size: var(--theme-form-button-font-size-normal);
    line-height: var(--line-height);
    padding: 8px 12px;

    &::placeholder,
    &::-webkit-input-placeholder {
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-style: italic;
      font-weight: 400;
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
  -webkit-box-shadow: 0 0 0px 1000px var(--theme-form-input-bg) inset;
  -webkit-text-fill-color: var(--theme-form-input-text);
  transition: background-color 5000s ease-in-out 0s;
}
</style>
