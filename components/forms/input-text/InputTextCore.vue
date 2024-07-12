<template>
  <div class="input-text-wrapper" :class="[{ 'has-left-content': hasLeftContent }]">
    <template v-if="hasLeftContent">
      <span class="left-content">
        <slot name="left"></slot>
      </span>
    </template>

    <input
      :type
      :placeholder="c12.placeholder"
      :id
      :name
      :pattern="componentValidation.pattern"
      :maxlength="componentValidation.maxlength"
      :required
      :class="['input-text', 'text-normal', styleClassPassthrough, { active: isFocused }, { dirty: isDirty }, { error: fieldHasError() }]"
      v-model="modelValue.data[name]"
      ref="inputField"
      :readonly="isPending"
      @focusin="updateFocus(name, true)"
      @focusout="updateFocus(name, false)"
    />

    <template v-if="hasRightContent">
      <span class="right-content">
        <slot name="right"></slot>
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { InpuTextC12, IFormData } from '@/types/types.forms';
import { validationConfig } from '@/components/forms/c12/validation-patterns';

const props = defineProps({
  type: {
    // type: String as PropType<"text" | "password" | "tel" | "number" | "email" | "url">, // This breaks props setup in unit tests
    type: String,
    validator(value: string) {
      return ['text', 'password', 'tel', 'number', 'email', 'url'].includes(value);
    },
  },
  id: {
    // type: String as PropType<string>,
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  validation: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    value: false,
  },
  c12: {
    type: Object as PropType<InpuTextC12>,
    required: true,
  },
  styleClassPassthrough: {
    type: String,
    default: '',
  },
});

const slots = useSlots();
const hasLeftContent = computed(() => slots.left !== undefined);
const hasRightContent = computed(() => slots.right !== undefined);

const modelValue = defineModel() as Ref<IFormData>;

const updateFocus = (name: string, isFocused: boolean) => {
  modelValue.value.focusedField = isFocused ? name : '';
};

const isPending = computed(() => {
  return modelValue.value.isPending;
});

const isFocused = computed(() => {
  return modelValue.value.focusedField == name.value;
});

const isDirty = computed(() => {
  return modelValue.value.dirtyFields[name.value];
});

const name = computed(() => {
  return props.name !== null ? props.name : props.id;
});

const validatorLocale = toRef(useRuntimeConfig().public.validatorLocale);

const componentValidation = validationConfig[validatorLocale.value][props.validation];
const inputField = ref<HTMLInputElement | null>(null);

const { hasCustomError, removeCustomError } = useErrorMessage(name.value, modelValue);

const fieldHasError = () => {
  const hasApiErrorMessage = hasCustomError();
  const inputBad = !inputField.value?.validity.valid;

  if (modelValue.value.isPending) {
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
    return hasApiErrorMessage ? hasApiErrorMessage : inputBad;
  }
  return false;
};

watchEffect(() => {
  console.log('watchEffect()');
  modelValue.value.dirtyFields[name.value] = modelValue.value.data[name.value] !== '';

  modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
  if (hasCustomError()) {
    removeCustomError(inputField.value?.validity.valid);
  }
});

const isValid = () => {
  setTimeout(() => {
    modelValue.value!.validityState[name.value] = inputField.value?.validity.valid ?? false;
  }, 0);
};

onMounted(() => {
  isValid();
});
</script>

<style lang="css">
.input-text-wrapper {
  display: flex;
  align-items: center;

  &.has-left-content {
    margin-left: var(--_gutter);

    .left-content {
      display: flex;
      align-items: center;
    }
  }
}
</style>
