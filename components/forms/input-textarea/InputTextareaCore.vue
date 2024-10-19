<template>
  <div class="input-textarea-wrapper" :class="[{ dirty: isDirty }, { active: isActive }, { error: fieldHasError }, { 'has-left-slot': hasLeftSlot }, { 'has-right-slot': hasRightSlot }]">
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
const { maxlength, id, name, placeholder, fieldHasError, required, styleClassPassthrough } = defineProps({
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
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

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
  --_border-color: var(--_form-theme);
  --_input-bg-color: white;
  --_input-text-color: var(--brand-grayscale-text-form);

  display: flex;
  align-items: center;

  background-color: var(--_input-bg-color);
  border-radius: var(--input-border-width-default);
  border: var(--_border-width) solid var(--_border-color);

  &.theme-secondary {
    --_form-theme: var(--theme-form-secondary);
    --_focus-colour: var(--theme-form-secondary-focus);
  }

  &.error {
    --_form-theme: var(--theme-error);
    --_input-text-color: var(--theme-error);
  }

  &:focus-within {
    --_border-color: white;
    /* background-color: hsl(from var(--_form-theme) h s 95%); */

    outline: var(--focus-visible-outline);
    box-shadow: var(--focus-visible-box-shadow);
  }

  .slot {
    display: inline-block;
    padding-inline: 8px;

    .icon {
      color: var(--_input-text-color);
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

    color: var(--_input-text-color);
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
