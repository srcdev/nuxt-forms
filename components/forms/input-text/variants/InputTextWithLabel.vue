<template>
  <div class="input-text-with-label" :data-form-theme="formTheme" :class="[elementClasses, { dirty: isDirty }, { active: isActive }]">
    <label :for="id" class="input-text-label body-normal-bold">{{ label }}</label>

    <div v-if="hasDescriptionSlot" :id="`${id}-description`">
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
</template>

<script setup lang="ts">
import propValidators from '../../c12/prop-validators';
const { type, inputmode, maxlength, id, name, placeholder, label, errorMessage, fieldHasError, required, styleClassPassthrough, theme } = defineProps({
  maxlength: {
    type: Number,
    default: 255,
  },
  type: {
    type: String,
    required: true,
  },
  inputmode: {
    type: String as PropType<'text' | 'email' | 'tel' | 'url' | 'search' | 'numeric' | 'none' | 'decimal'>,
    default: 'text',
    validator(value: string) {
      return propValidators.inputMode.includes(value);
    },
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
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => slots.description !== undefined);
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const formTheme = computed(() => {
  return fieldHasError ? 'error' : theme;
});

const errorId = `${id}-error-message`;
const ariaDescribedby = computed(() => {
  const ariaDescribedbyId = hasDescriptionSlot.value ? `${id}-description` : null;
  return fieldHasError ? errorId : ariaDescribedbyId;
});

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
  .input-text-label {
    display: block;
    margin-block: 0.8rem;
  }
}
</style>
