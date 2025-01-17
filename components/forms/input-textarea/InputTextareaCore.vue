<template>
  <div
    class="input-textarea-wrapper"
    :data-form-theme="formTheme"
    :data-size="size"
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
  --_gutter: 1.2rem;
  --_border-width: var(--form-element-border-width);
  --_outline-width: var(--form-element-border-width);

  display: flex;
  align-items: center;

  background-color: var(--theme-form-input-bg);
  border-radius: var(--form-element-border-width);
  border: var(--_border-width) solid var(--theme-form-input-border);

  &:focus-within {
    border: var(--_border-width) solid var(--theme-form-input-border-focus);
    outline: var(--_outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 50%);
    box-shadow: var(--form-focus-box-shadow);
  }

  .slot {
    display: inline-block;
    padding-inline: 0.8rem;

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

  .input-textarea-core {
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
  }
}
</style>
