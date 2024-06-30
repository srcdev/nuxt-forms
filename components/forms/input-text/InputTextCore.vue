<template>
  <input
    :type
    :placeholder="c12.placeholder"
    :id
    :name
    :pattern="componentValidation.pattern"
    :maxlength="componentValidation.maxlength"
    :required
    :class="['input-text', 'text-normal', { error: fieldHasError() }]"
    v-model="modelValue.data[name]"
    ref="inputField"
    @focusin="isFocused = true"
    @focusout="isFocused = false"
  />
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';
import { validationConfig } from '@/components/forms/c12/validation-patterns';

const props = defineProps({
  type: {
    // type: String as PropType<"text" | "password" | "tel" | "number" | "email" | "url">, // This breaks props setup in unit tests
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(
        value
      );
    },
  },
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  validation: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    value: false,
  },
  isPending: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
});

const modelValue = defineModel() as Ref<IFormData>;
const isFocused = defineModel('isFocused') as Ref<boolean>;

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});
const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

const componentValidation =
  validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const { hasCustomError, removeCustomError } = useErrorMessage(
  name.value,
  modelValue
);

const fieldHasError = () => {
  const hasApiErrorMessage = hasCustomError();
  const inputBad = !inputField.value?.validity.valid;

  if (modelValue.value.isPending) {
    modelValue.value!.validityState[name.value] =
      inputField.value?.validity.valid ?? false;
    return hasApiErrorMessage ? hasApiErrorMessage : inputBad;
  }
  return false;
};

// watchEffect(() => {
//   console.log('Form value changed to: ', modelValue.value.data[name.value]);
// });

const isValid = () => {
  setTimeout(() => {
    modelValue.value!.validityState[name.value] =
      inputField.value?.validity.valid ?? false;
  }, 0);
};

// Keep an eye on this for performance issue
watch(
  () => modelValue.value.data[name.value],
  () => {
    modelValue.value!.validityState[name.value] =
      inputField.value?.validity.valid ?? false;
    if (hasCustomError()) {
      removeCustomError(inputField.value?.validity.valid);
    }
  },
  { deep: true }
);

onMounted(() => {
  isValid();
});
</script>

<style lang="css">
.input-text {
  transition: all linear 200ms;
  padding-left: 4px;
  width: 100%;
}
</style>
