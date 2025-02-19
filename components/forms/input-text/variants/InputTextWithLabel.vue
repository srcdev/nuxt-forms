<template>
  <div>
    <div class="input-text-with-label" :data-form-theme="formTheme" :class="[elementClasses, { isMaterial: isMaterial }, { dirty: isDirty }, { active: isActive }]">
      <label :for="id" class="input-text-label">{{ label }}</label>

      <div v-if="!isMaterial && hasDescriptionSlot" :id="`${id}-description`">
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
        :isMaterial
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

    <div v-if="isMaterial && hasDescriptionSlot" :id="`${id}-description`">
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
  isMaterial: {
    type: Boolean,
    default: false,
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
  --_focus-box-shadow: var(--box-shadow-off);

  .input-text-label {
    display: block;
    margin-block: 0.8rem;
    font-size: var(--step-1);
    font-weight: normal;
    line-height: 1.5;
  }

  /* Material Design Styles */

  &.isMaterial {
    --_label-offset: 0 0;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'material-text-stack';

    background-color: var(--theme-form-input-bg);
    border-radius: var(--form-element-border-width);
    border: var(--form-element-border-width) solid var(--theme-form-input-border);
    outline: var(--form-element-outline-width) solid var(--theme-form-input-outline);
    box-shadow: var(--_focus-box-shadow);

    padding: 0 0.8rem;

    .input-text-label {
      grid-area: material-text-stack;

      display: inline-block;
      width: fit-content;
      padding: 0.2rem 1.2rem;
      background-color: var(--theme-form-input-bg);
      border-radius: 0.4em;
      color: var(--theme-form-input-text);
      translate: var(--_label-offset);

      font-size: var(--step-2);
      font-weight: normal;
      line-height: 1.5;

      transition: font-size 0.2s ease-in-out, translate 0.2s ease-in-out;

      &:has(+ .input-text-wrapper.active),
      &:has(+ .input-text-wrapper.dirty) {
        --_label-offset: 0 -3rem;
        /* font-size: var(--step-2); */
        /* padding: 0.2rem 1.2rem; */
      }
    }

    .input-text-wrapper {
      grid-area: material-text-stack;
    }
  }
}
</style>
