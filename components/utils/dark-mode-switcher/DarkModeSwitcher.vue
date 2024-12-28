<template>
  <ToggleSwitchCore v-model="displayMode" class="dark-mode-switcher" :class="elementClasses" true-value="dark" false-value="light" name="header-dark-mode-switcher" id="header-dark-mode-switcher">
    <template #iconOn>
      <Icon name="radix-icons:moon" class="icon" />
    </template>
    <template #iconOff>
      <Icon name="radix-icons:sun" class="icon" />
    </template>
  </ToggleSwitchCore>
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
