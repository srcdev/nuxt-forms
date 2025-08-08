<template>
  <div
    class="input-text-wrapper"
    :data-theme="formTheme"
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
  background-color: var(--theme-input-surface);
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
    background-color: var(--theme-input-surface-hover);
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
</style>
