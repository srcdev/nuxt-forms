<template>
  <div class="input-textarea-with-label" :class="[elementClasses, { dirty: isDirty }, { active: isActive }]">
    <label :for="c12n.id" class="input-textarea-label">{{ c12n.label }}</label>

    <InputTextareaCore v-model:string="modelValue" v-model:isDirty="isDirty" v-model:isActive="isActive" :c12n :styleClassPassthrough="deepCssClassPassthrough">
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextareaCore>
    <InputError :errorMessage="c12n.errorMessage" :fieldHasError="c12n.fieldHasError" :id="c12n.id" :isDetached="false" />
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
const isActive = ref<boolean>(false);
const isDirty = ref<boolean>(false);

const { elementClasses, updateElementClasses } = useStyleClassPassthrough(c12n.styleClassPassthrough);
const deepCssClassPassthrough = ref(c12n.deepCssClassPassthrough);

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
.input-textarea-with-label {
  --_form-theme: var(--theme-form-primary);
  --_focus-colour: var(--theme-form-primary-focus);
  --_border-width: var(--input-border-width-thin);
  --_border-color: var(--_form-theme);
  --_outline-width: var(--input-outline-width-thin);

  .input-textarea-label {
    display: block;
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 500;
    padding-block: 8px;
  }
}
</style>
