<template>
  <ToggleSwitchWithLabelInline v-model="displayMode" id="dark-mode-switcher" name="dark-mode-switcher" label="Toggle Dark mode (inline)" size="small">
    <template #iconOn>
      <Icon name="radix-icons:moon" class="icon" />
    </template>
    <template #iconOff>
      <Icon name="radix-icons:sun" class="icon" />
    </template>
  </ToggleSwitchWithLabelInline>
</template>

<script setup lang="ts">
const { styleClassPassthrough } = defineProps({
  styleClassPassthrough: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const displayMode = ref<'auto' | 'dark' | 'light'>('auto');
const { elementClasses } = useStyleClassPassthrough(styleClassPassthrough);
useColourScheme(displayMode);
</script>
