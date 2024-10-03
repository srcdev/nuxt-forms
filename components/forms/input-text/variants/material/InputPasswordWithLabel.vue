<template>
  <InputTextWithLabel v-model="modelValue" :c12n>
    <template #right>
      <InputButtonCore
        type="button"
        @click.stop.prevent="toggleDisplayPassword"
        :is-pending="false"
        :buttonText
        theme="ghost"
        size="x-small"
        @focusin="updateFocus(c12n.name, true)"
        @focusout="updateFocus(c12n.name, false)"
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
import type { InputTextWithLabel, IFormFieldC12, IFormData, IFieldsInitialState, TFieldsInitialState } from '@/types/types.forms';

const { c12n } = defineProps({
  c12n: {
    type: Object as PropType<InputTextWithLabel>,
    required: true,
  },
});

const modelValue = defineModel();

const updateFocus = (name: string, isFocused: boolean) => {
  // console.log('updateFocus', name, isFocused);
  // modelValue.value.focusedField = isFocused ? name : '';
};

const displayPassword = ref(false);
const buttonText = computed(() => {
  c12n.type = displayPassword.value ? 'text' : 'password';
  return displayPassword.value ? 'Hide password' : 'Show password';
});
const toggleDisplayPassword = () => {
  displayPassword.value = !displayPassword.value;
};
</script>

<style lang="css"></style>
