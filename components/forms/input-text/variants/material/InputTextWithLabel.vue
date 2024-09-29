<template>
  <div class="input-text-with-label" :class="elementClasses">
    <label :for="c12n.id">{{ c12n.label }} | error({{ c12n.fieldHasError }})</label>

    <InputTextCore v-model="modelValue" :c12n :styleClassPassthrough="deepCssClassPassthrough">
      <template v-if="hasLeftSlot" #left>
        <slot name="left"></slot>
      </template>
      <template v-if="hasRightSlot" #right>
        <slot name="right"></slot>
      </template>
    </InputTextCore>
  </div>
</template>

<script setup lang="ts">
import type { InputTextWithLabel, IFormFieldC12, IFormData, IFieldsInitialState } from '@/types/types.forms';

const { c12n } = defineProps({
  c12n: {
    type: Object as PropType<InputTextWithLabel>,
    required: true,
  },
});

const slots = useSlots();
const hasLeftSlot = computed(() => slots.left !== undefined);
const hasRightSlot = computed(() => slots.right !== undefined);

const modelValue = defineModel<IFieldsInitialState>();

const { elementClasses, updatedElementClasses } = useStyleClassPassthrough(c12n.styleClassPassthrough);
const deepCssClassPassthrough = ref(c12n.deepCssClassPassthrough);
</script>

<style lang="css"></style>
