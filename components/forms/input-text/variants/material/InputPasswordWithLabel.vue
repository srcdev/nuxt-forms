<template>
  <InputTextWithLabel v-model="modelValue" :type="inputType" :maxlength :id :name :placeholder :label :errorMessage :fieldHasError :required :styleClassPassthrough>
    <template #right>
      <InputButtonCore
        type="button"
        @click.stop.prevent="toggleDisplayPassword"
        :is-pending="false"
        :buttonText
        theme="ghost"
        size="x-small"
        @focusin="updateFocus(name, true)"
        @focusout="updateFocus(name, false)"
      >
        <template #iconOnly>
          <Icon v-if="displayPassword" name="radix-icons:eye-none" class="icon" />
          <Icon v-else name="radix-icons:eye-open" class="icon" />
        </template>
      </InputButtonCore>
    </template>
  </InputTextWithLabel>
</template>

<script setup lang="ts">
const { type, maxlength, id, name, placeholder, label, errorMessage, fieldHasError, required, styleClassPassthrough } = defineProps({
  type: {
    type: String,
    default: 'password',
  },
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
});

const modelValue = defineModel();

const updateFocus = (name: string, isFocused: boolean) => {
  // console.log('updateFocus', name, isFocused);
  // modelValue.value.focusedField = isFocused ? name : '';
};

const inputType = ref(type);

const displayPassword = ref(false);
const buttonText = computed(() => {
  inputType.value = displayPassword.value ? 'text' : 'password';
  return displayPassword.value ? 'Hide password' : 'Show password';
});
const toggleDisplayPassword = () => {
  displayPassword.value = !displayPassword.value;
};
</script>

<style lang="css"></style>
