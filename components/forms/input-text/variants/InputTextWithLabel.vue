<template>
  <div>
    <div class="input-text-with-label" :data-form-theme="formTheme" :class="[elementClasses, inputVariant, { dirty: isDirty }, { active: isActive }]">
      <label :for="id" class="input-text-label">{{ label }}</label>

      <div v-if="inputVariant === 'normal' && hasDescriptionSlot" :id="`${id}-description`">
        <slot name="description"></slot>
      </div>

      <InputTextCore
        v-model="modelValue"
        v-model:isDirty="isDirty"
        v-model:isActive="isActive"
        :type
        :inputmode
        :maxlength
        :id
        :name
        :placeholder
        :label
        :errorMessage
        :fieldHasError
        :required
        :styleClassPassthrough
        :theme
        :ariaDescribedby
        :size
        :inputVariant
      >
        <template v-if="hasLeftSlot" #left>
          <slot name="left"></slot>
        </template>
        <template v-if="hasRightSlot" #right>
          <slot name="right"></slot>
        </template>
      </InputTextCore>

      <InputError :errorMessage="errorMessage" :showError="fieldHasError" :id="errorId" :isDetached="false" />
    </div>

    <div v-if="inputVariant !== 'normal' && hasDescriptionSlot" :id="`${id}-description`">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
const props = defineProps({
  maxlength: {
    type: Number,
    default: 255,
  },
  type: {
    type: String as PropType<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>,
    required: true,
  },
  inputmode: {
    type: String as PropType<'text' | 'email' | 'tel' | 'url' | 'search' | 'numeric' | 'none' | 'decimal'>,
    default: 'text',
    validator(value: string) {
      return propValidators.inputMode.includes(value);
    },
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
    default: 'normal',
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
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return props.fieldHasError ? 'error' : props.theme;
});

const id = useId();
const errorId = `${id}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : undefined;
  return props.fieldHasError ? errorId : ariaDescribedbyId;
});

const modelValue = defineModel();
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);

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
.input-text-with-label {
  --_input-text-with-label-margin-block-start: 0;
  --_input-text-with-label-background-color: transparent;

  --_input-text-wrapper-border: var(--form-element-border-width) solid var(--theme-form-input-border);
  --_input-text-wrapper-border-radius: var(--form-input-border-radius);
  --_input-text-wrapper-border-underlined: var(--form-element-border-width-underlined) solid var(--theme-form-input-border);
  --_input-text-wrapper-outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
  --_input-text-wrapper-box-shadow: var(--_focus-box-shadow);
  --_input-text-wrapper-padding-block: 0;

  --_focus-box-shadow: var(--box-shadow-off);

  /* Label vars */
  --_label-text-color: var(--theme-form-input-text-label-color-normal);
  --_label-text-margin-block: 0.8rem;
  --_label-text-size: var(--step-1);
  --_label-text-weight: normal;
  --_label-text-line-height: 1.5;

  &.underlined {
    --_label-text-color: var(--theme-form-input-text-label-color-underlined);
    --_label-offset: 0 0;
    --_input-text-with-label-background-color: var(--theme-form-input-bg-underlined);
    --_input-text-wrapper-border-radius: 0;

    &:has(.input-text-wrapper.active),
    &:has(.input-text-wrapper.dirty) {
      --_label-offset: 0 -2.8rem;
      /* font-size: var(--step-1); */
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }
  }

  &.outlined {
    --_label-text-color: var(--theme-form-input-text-label-color-outlined);

    --_label-offset: 1rem 0;
    --_input-text-with-label-background-color: var(--theme-form-input-bg-normal);

    --_input-text-wrapper-padding-block: 0.4em;

    &:has(.input-text-wrapper.active),
    &:has(.input-text-wrapper.dirty) {
      --_label-offset: 1rem -2.8rem;
      /* font-size: var(--step-1); */
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }
  }

  &:not(.normal) {
    --_input-text-with-label-margin-block-start: 2em;

    &:has(.input-text-wrapper.active),
    &:has(.input-text-wrapper.dirty) {
      /* --_label-offset: 1rem -2.8rem; */
      /* font-size: var(--step-1); */
      /* line-height: 1.5; */
      /* padding: 0.2rem 1.2rem; */
    }

    &:focus-within {
      --_input-text-wrapper-box-shadow: var(--box-shadow-on);
      --_input-text-wrapper-outline: var(--form-element-outline-width) solid hsl(from var(--theme-form-input-outline-focus) h s 90%);
    }
  }

  /*
  * Apply generic styles
  **/

  background-color: var(--_input-text-with-label-background-color);
  border-radius: var(--_input-text-wrapper-border-radius);

  &.underlined {
    border-bottom: var(--_input-text-wrapper-border-underlined);
  }

  &.outlined {
    border: var(--_input-text-wrapper-border);
    outline: var(--_input-text-wrapper-outline);
    box-shadow: var(--_input-text-wrapper-box-shadow);
    padding-block: var(--_input-text-wrapper-padding-block);
  }

  &:not(.normal) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'underlined-text-stack';

    margin-block-start: var(--_input-text-with-label-margin-block-start);

    .input-text-label {
      grid-area: underlined-text-stack;
      z-index: 2;
    }
    .input-text-wrapper {
      grid-area: underlined-text-stack;
      z-index: 1;
    }
  }

  .input-text-label {
    display: block;
    color: var(--_label-text-color);
    margin-block: var(--_label-text-margin-block);
    font-size: var(--_label-text-size);
    font-weight: var(--_label-text-weight);
    line-height: var(--_label-text-line-height);
    translate: var(--_label-offset);
    transition: font-size 0.2s ease-in-out, translate 0.2s ease-in-out;
  }
}
</style>
