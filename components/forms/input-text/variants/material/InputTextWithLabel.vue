<template>
  <div class="input-text-with-label" :class="[elementClasses, { dirty: isDirty }, { active: isActive }]">
    <label :for="id" class="input-text-label">{{ label }}</label>

    <InputTextCore
      v-model="modelValue"
      v-model:isDirty="isDirty"
      v-model:isActive="isActive"
      :type
      :maxlength
      :id
      :name
      :placeholder
      :label
      :errorMessage
      :fieldHasError
      :required
      :styleClassPassthrough
    >
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextCore>
    <InputError :errorMessage="errorMessage" :fieldHasError :id :isDetached="false" />
  </div>
</template>

<script setup lang="ts">
import type { InputTextWithLabel, IFormFieldC12, IFormData, IFieldsInitialState, TFieldsInitialState } from '@/types/types.forms';

const { type, maxlength, id, name, placeholder, label, errorMessage, fieldHasError, required, styleClassPassthrough } = defineProps({
  maxlength: {
    type: Number,
    default: 255,
  },
  type: {
    type: String,
    required: true,
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
  label: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
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
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const modelValue = defineModel();
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(styleClassPassthrough);

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
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);
  --_outline-width: var(--input-outline-width-thin);

  .input-text-label {
    display: block;
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 500;
    padding-block: 8px;
  }
}
</style>
