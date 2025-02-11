<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <ColourSchemeSelect />
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Homepage',
  meta: [{ name: 'description', content: 'Homepage' }],
  bodyAttrs: {
    class: '',
  },
});

const colorModeVal = ref(0);

watch(colorModeVal, (val) => {
  console.log('colorModeVal', val);
});
</script>

<style lang="css">
/* p {
  color: initial;
} */
</style>
