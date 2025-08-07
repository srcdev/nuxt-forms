<template>
  <div
    class="input-textarea-wrapper"
    :data-theme="formTheme"
    :data-size="size"
    :class="[inputVariant, { dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]"
  >
    <span v-if="hasLeftSlot" class="slot left-slot">
      <slot name="left"></slot>
    </span>

    <textarea
      :maxlength
      :placeholder
      :id
      :name
      :required
      :class="['input-textarea-core', elementClasses, { dirty: isDirty }, { active: isActive }]"
      v-model="modelValue"
      ref="inputField"
      :aria-invalid="fieldHasError"
      :aria-describedby="`${id}-error-message`"
      @focusin="updateFocus(true)"
      @focusout="updateFocus(false)"
    ></textarea>

    <span v-if="hasRightSlot" class="slot right-slot">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';
const props = defineProps({
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
  placeholder: {
    type: String,
    default: '',
  },
  fieldHasError: {
    type: Boolean,
    default: false,
  },
  required: {
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

const modelValue = defineModel<string | number | readonly string[] | null | undefined>();
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');

const updateFocus = (isFocused: boolean) => {
  isActive.value = isFocused;
};

const inputField = ref<HTMLInputElement | null>(null);

const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.input-textarea-wrapper {
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

  .input-textarea-core {
    all: unset;
    flex-grow: 1;
    field-sizing: content;

    font-family: var(--font-family);
    font-size: var(--form-element-font-size);
    line-height: var(--form-element-line-height);
    padding-block: var(--input-element-padding-block);
    padding-inline: var(--input-element-padding-inline);

    min-height: var(--input-textarea-min-height);

    &::placeholder {
      color: var(--input-placeholder-color);
      font-size: var(--input-placeholder-font-size);
      font-style: var(--input-placeholder-font-style);
      line-height: var(--input-placeholder-line-height);
      font-weight: var(--input-placeholder-font-weight);
    }
  }
}

.input-textarea-wrapper-XXX {
  --_focus-box-shadow: var(--box-shadow-off);
  --_input-textarea-core-color: var(--theme-form-input-text-color-normal);

  --_input-textarea-wrapper-background-color: var(--theme-button-surface);

  --_input-textarea-wrapper-border: var(--form-element-border-width) solid var(--theme-input-border);
  --_input-textarea-wrapper-border-radius: var(--form-input-border-radius);

  --_input-textarea-wrapper-outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  --_input-textarea-wrapper-opacity: 1;
  --_input-textarea-wrapper-box-shadow: var(--_focus-box-shadow);
  --_input-textarea-wrapper-margin-inline: 0;
  --_input-textarea-wrapper-padding-block: 0;

  &.underlined {
    --_input-textarea-core-color: var(--theme-form-input-text-color-underlined);
    --_input-textarea-wrapper-background-color: transparent;
    --_input-textarea-wrapper-padding-block: 0.5rem;
  }

  &.outlined {
    --_input-textarea-wrapper-margin-inline: 1px;
    --_input-textarea-wrapper-background-color: var(--theme-form-input-bg-outlined);
  }

  &.normal {
    &:focus-within {
      --_input-textarea-wrapper-box-shadow: var(--box-shadow-on);
      --_input-textarea-wrapper-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    }
  }

  &:not(.normal) {
    --_input-textarea-wrapper-border: none;
    --_input-textarea-wrapper-box-shadow: none;
    --_input-textarea-wrapper-outline: none;
    --_input-textarea-wrapper-opacity: 0;

    &:focus {
      --_input-textarea-wrapper-border: none;
      --_input-textarea-wrapper-box-shadow: none;
      --_input-textarea-wrapper-outline: none;
      --_input-textarea-wrapper-background-color: transparent;
    }

    &:focus-within {
      --_input-textarea-wrapper-border: none;
      --_input-textarea-wrapper-box-shadow: none;
      --_input-textarea-wrapper-outline: none;
      --_input-textarea-wrapper-background-color: transparent;
    }

    &.active,
    &.dirty {
      --_input-textarea-wrapper-border: none;
      --_input-textarea-wrapper-box-shadow: none;
      --_input-textarea-wrapper-outline: none;
      --_input-textarea-wrapper-background-color: transparent;

      --_input-textarea-wrapper-opacity: 1;
    }
  }

  display: flex;
  align-items: center;

  background-color: var(--_input-textarea-wrapper-background-color);
  border-radius: var(--_input-textarea-wrapper-border-radius);
  border: var(--_input-textarea-wrapper-border);
  outline: var(--_input-textarea-wrapper-outline);
  box-shadow: var(--_input-textarea-wrapper-box-shadow);
  opacity: var(--_input-textarea-wrapper-opacity);

  margin-inline: var(--_input-textarea-wrapper-margin-inline);
  padding-block: var(--_input-textarea-wrapper-padding-block);

  &:not(.normal) {
    transition: opacity 0.2s ease-in-out;
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

  .input-textarea-core {
    background-color: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    flex-grow: 1;

    min-height: 4lh;
    field-sizing: content;

    color: var(--_input-textarea-core-color);
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
}
</style>
