<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <div>
          <h1>Sample form page pages</h1>

          <p>Example test fields in default material UI</p>
        </div>
        <div class="mbs-20">
          <h2>Colour mode picker as raange icons</h2>
        </div>
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
</script>

<style lang="css">
/* p {
  color: initial;
} */
</style>
