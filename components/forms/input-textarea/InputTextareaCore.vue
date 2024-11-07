<template>
  <div
    class="input-textarea-wrapper"
    :data-form-theme="formTheme"
    :class="[{ dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]"
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
      :class="['input-text-core', 'text-normal', elementClasses, { dirty: isDirty }, { active: isActive }]"
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
const { maxlength, id, name, placeholder, fieldHasError, required, styleClassPassthrough, theme } = defineProps({
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
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const modelValue = defineModel<string | number | readonly string[] | null | undefined>();
const isDirty = defineModel('isDirty');
const isActive = defineModel('isActive');

const updateFocus = (isFocused: boolean) => {
  isActive.value = isFocused;
};

const inputField = ref<HTMLInputElement | null>(null);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

onMounted(() => {
  updateElementClasses(['deep-bristol', 'deep-london', 'deep-bath']);
});
</script>

<style lang="css">
.input-textarea-wrapper {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_gutter: 12px;
  --_border-width: var(--input-border-width-thin);
  --_outline-width: var(--input-border-width-thin);

  display: flex;
  align-items: center;

  background-color: var(--theme-form-input-bg);
  border-radius: var(--input-border-width-default);
  border: var(--_border-width) solid var(--theme-form-input-border);

  &:focus-within {
    border: var(--_border-width) solid var(--theme-form-input-border-focus);
    outline: var(--_outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 50%);
    box-shadow: var(--focus-visible-box-shadow);
  }

  .slot {
    display: inline-block;
    padding-inline: 8px;

    .icon {
      color: var(--theme-form-input-text);
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
</style>
