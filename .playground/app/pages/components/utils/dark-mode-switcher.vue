<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <h1 class="heading-3">Dark mode switcher</h1>
        <p class="body-normal">This is a dark mode switcher example. Click the button to toggle between dark and light mode.</p>

        <DarkModeSwitcher label="Toggle dark mode" id="dark-mode-switcher" name="dark-mode-switcher" :style-class-passthrough="['mi-8']" />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Dark mode switcher Example',
  meta: [{ name: 'description', content: 'Dark mode switcher' }],
});
</script>
