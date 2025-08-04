<template>
  <div class="input-textarea-with-label" :data-form-theme="formTheme" :class="[elementClasses, inputVariant, { dirty: isDirty }, { active: isActive }]">
    <InputLabel :for="id" :id :theme :name :input-variant :field-has-error :style-class-passthrough="['input-textarea-label']">
      <template #textLabel>{{ label }}</template>
    </InputLabel>

    <InputTextareaCore
      v-model="modelValue"
      v-model:isDirty="isDirty"
      v-model:isActive="isActive"
      :maxlength
      :id
      :name
      :placeholder
      :label
      :fieldHasError
      :required
      :styleClassPassthrough
      :theme
      :size
      :inputVariant
    >
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextareaCore>
    <InputError :errorMessage :showError="fieldHasError" :id :isDetached="false" :inputVariant />
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
const props = defineProps({
  maxlength: {
    type: Number,
    default: 255,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: [Object, String],
    required: true,
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

const id = useId();
const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const modelValue = defineModel<string | number | readonly string[] | null | undefined>();
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

const testDirty = () => {
  const watchValue = modelValue.value ?? '';

  if (!isDirty.value && typeof watchValue === 'string' && watchValue.length > 0) {
    isDirty.value = true;
  }
};

onMounted(() => {
  testDirty();
});

watch(
  () => modelValue.value,
  () => {
    testDirty();
  }
);
</script>

<style lang="css">
.input-textarea-with-label-XXX {
  --_input-textarea-with-label-margin-block-start: 0;
  --_input-textarea-with-label-background-color: transparent;

  --_input-textarea-wrapper-border: var(--form-element-border-width) solid var(--theme-form-input-border);
  --_input-textarea-wrapper-border-radius: var(--form-input-border-radius);
  --_input-textarea-wrapper-border-underlined: var(--form-element-border-width-underlined) solid var(--theme-form-input-border);
  --_input-textarea-wrapper-outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  --_input-textarea-wrapper-box-shadow: var(--_focus-box-shadow);
  --_input-textarea-wrapper-padding-block: 0;

  --_focus-box-shadow: var(--box-shadow-off);

  /* Label vars */
  --_label-textarea-color: var(--theme-form-input-text-label-color-normal);
  --_label-textarea-margin-block: 0.8rem;
  --_label-textarea-size: var(--step-5);
  --_label-textarea-weight: normal;
  --_label-textarea-height: auto;
  --_label-textarea-line-height: 1.5;
  --_label-textarea-background-color: var(--_input-textarea-with-label-background-color);

  &.underlined {
    --_label-textarea-color: var(--theme-form-input-text-label-color-underlined);
    --_label-offset: 1rem 0;
    --_input-textarea-with-label-background-color: color-mix(in srgb, currentColor 5%, transparent);

    --_input-textarea-wrapper-underlined-border-radius-top-left: 0;
    --_input-textarea-wrapper-underlined-border-radius-top-right: 0;
    --_input-textarea-wrapper-underlined-border-radius-bottom-left: 4px;
    --_input-textarea-wrapper-underlined-border-radius-bottom-right: 4px;

    --_label-textarea-background-color: transparent;
    --_label-textarea-height: fit-content;

    &:has(.input-textarea-wrapper.active),
    &:has(.input-textarea-wrapper.dirty) {
      --_label-offset: 0 -3.2rem;
      --_label-textarea-weight: bolder;
      --_label-textarea-size: var(--step-4);
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }
  }

  &.outlined {
    --_label-textarea-color: var(--theme-form-input-text-label-color-outlined);

    --_label-offset: 1rem 0;
    --_input-textarea-with-label-background-color: var(--theme-form-input-bg-normal);

    --_input-textarea-wrapper-padding-block: 0.4em 0;
    --_label-textarea-height: fit-content;

    &:has(.input-textarea-wrapper.active),
    &:has(.input-textarea-wrapper.dirty) {
      --_label-offset: 1rem -2.8rem;
      --_label-textarea-weight: normal;
      /* --_label-textarea-size: var(--step-4); */
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }
  }

  &:not(.normal) {
    --_input-textarea-with-label-margin-block-start: 3em;

    &:has(.input-textarea-wrapper.active),
    &:has(.input-textarea-wrapper.dirty) {
      /* --_label-offset: 1rem -2.8rem; */
      /* font-size: var(--step-4); */
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }

    &:focus-within {
      --_input-textarea-wrapper-box-shadow: var(--box-shadow-on);
      --_input-textarea-wrapper-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    }
  }

  /*
  * Apply generic styles
  **/

  background-color: var(--_input-textarea-with-label-background-color);
  border-radius: var(--_input-textarea-wrapper-border-radius);
  /* overflow: clip; */

  &.underlined {
    /* border-bottom: var(--_input-textarea-wrapper-border-underlined); */
    border-top-left-radius: var(--_input-textarea-wrapper-underlined-border-radius-top-left);
    border-top-right-radius: var(--_input-textarea-wrapper-underlined-border-radius-top-right);
    border-bottom-left-radius: var(--_input-textarea-wrapper-underlined-border-radius-bottom-left);
    border-bottom-right-radius: var(--_input-textarea-wrapper-underlined-border-radius-bottom-right);
  }

  &.outlined {
    border: var(--_input-textarea-wrapper-border);
    outline: var(--_input-textarea-wrapper-outline);
    box-shadow: var(--_input-textarea-wrapper-box-shadow);
    padding-block: var(--_input-textarea-wrapper-padding-block);
  }

  &:not(.normal) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'underlined-textarea-stack';

    margin-block-start: var(--_input-textarea-with-label-margin-block-start);

    .input-textarea-label {
      grid-area: underlined-textarea-stack;
      z-index: 2;
    }
    .input-textarea-wrapper {
      grid-area: underlined-textarea-stack;
      z-index: 1;
    }
  }

  .input-textarea-label {
    display: inline-block;
    color: var(--_label-textarea-color);
    background-color: var(--_label-textarea-background-color);
    margin-block: var(--_label-textarea-margin-block);
    font-size: var(--_label-textarea-size);
    font-weight: var(--_label-textarea-weight);
    line-height: var(--_label-textarea-line-height);
    translate: var(--_label-offset);
    width: fit-content;
    height: var(--_label-textarea-height);
    transition: font-size 0.2s ease-in-out, translate 0.2s ease-in-out;

    &:not(.normal) {
      display: flex;
      align-items: center;
    }
  }
}
</style>
