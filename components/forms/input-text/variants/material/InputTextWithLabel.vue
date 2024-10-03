<template>
  <div class="input-text-with-label" :class="[elementClasses, { dirty: isDirty }]">
    <label :for="c12n.id" class="input-text-label">{{ c12n.label }}</label>

    <InputTextCore v-model="modelValue" v-model:isDirty="isDirty" :c12n :styleClassPassthrough="deepCssClassPassthrough">
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextCore>
    <InputError :errorMessaging="c12n.errorMessage" :fieldHasError="c12n.fieldHasError" :id="c12n.id" :isDetached="false" />
  </div>
</template>

<script setup lang="ts">
import type { InputTextWithLabel, IFormFieldC12, IFormData, IFieldsInitialState, TFieldsInitialState } from '@/types/types.forms';

const { c12n } = defineProps({
  c12n: {
    type: Object as PropType<InputTextWithLabel>,
    required: true,
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const modelValue = defineModel();
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(c12n.styleClassPassthrough);
const deepCssClassPassthrough = ref(c12n.deepCssClassPassthrough);

onMounted(() => {
  if (!isDirty.value && modelValue.length > 0) {
    isDirty.value = true;
  }
});

watch(
  () => modelValue.value,
  () => {
    if (!isDirty.value && modelValue.length > 0) {
      isDirty.value = true;
    }
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
