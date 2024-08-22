<template>
  <div class="page-layout">
    <div>
      <h1><NuxtLink to="/">Home</NuxtLink></h1>
      <ul class="flex-group">
        <li>
          <NuxtLink to="/forms/examples/material/text-fields">Material UI text fields</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/forms/examples/material/text-fields-compact">Material UI text fields (compact)</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/forms/examples/buttons">Buttons</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="page-layout-content">
      <slot name="layout-content"></slot>
    </div>

    <div>
      <h1>Footer</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'body-default',
    id: 'body',
  },
});
</script>

<style lang="css">
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.page-layout-content {
  container: content / inline-size;
}

.flex-group {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}

ul.flex-group {
  list-style-type: none;
  padding: 0;
}
</style>
