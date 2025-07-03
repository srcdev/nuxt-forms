<template>
  <label :for="id" class="input-label" :class="[elementClasses]">
    <slot v-if="hasHtmlLabel" name="htmlLabel"></slot>
    <slot v-if="hasTextLabel" name="textLabel"></slot>
  </label>
</template>

<script setup lang="ts">
import propValidators from '../c12/prop-validators';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fieldHasError: {
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
  inputVariant: {
    type: String as PropType<string>,
    default: 'normal',
    validator(value: string) {
      return propValidators.inputVariant.includes(value);
    },
  },
});

const slots = useSlots();
const hasHtmlLabel = computed(() => slots.htmlLabel !== undefined);
const hasTextLabel = computed(() => slots.textLabel !== undefined);

const { elementClasses } = useStyleClassPassthrough(props.styleClassPassthrough);
</script>

<style lang="css">
.input-label {
  color: var(--input-label-text-color);
  margin-block: var(--input-label-text-margin-block);
  font-size: var(--input-label-text-size);
  font-weight: var(--input-label-text-weight);
  line-height: var(--input-label-text-line-height);
  display: block;
}
</style>
