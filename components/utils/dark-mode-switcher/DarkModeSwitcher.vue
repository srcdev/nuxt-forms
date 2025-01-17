<template>
  <ToggleSwitchWithLabelInline v-model="displayMode" :name :label labelWeight="normal" :size trueValue="dark" falseValue="light" :style-class-passthrough>
    <template #iconOn>
      <Icon name="radix-icons:moon" class="icon" />
    </template>
    <template #iconOff>
      <Icon name="radix-icons:sun" class="icon" />
    </template>
  </ToggleSwitchWithLabelInline>
</template>

<script setup lang="ts">
import propValidators from '../../forms/c12/prop-validators';

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  labelWeight: {
    type: String as PropType<string>,
    default: 'semi-bold',
    validator(value: string) {
      return propValidators.labelWeight.includes(value);
    },
  },
  size: {
    type: String as PropType<string>,
    default: 'small',
    validator(value: string) {
      return propValidators.size.includes(value);
    },
  },
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const displayMode = ref<'auto' | 'dark' | 'light'>('auto');

useColourScheme(displayMode);
</script>
