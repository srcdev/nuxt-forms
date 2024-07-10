<template>
  <div class="page-layout">
    <div>
      <h1><NuxtLink to="/">Home</NuxtLink></h1>
      <ul>
        <li>
          <NuxtLink to="/forms/examples/material/text-fields"
            >Material UI text fields</NuxtLink
          >
        </li>
        <li>
          <NuxtLink to="/forms/examples/material/text-fields-compact"
            >Material UI text fields (compact)</NuxtLink
          >
        </li>
      </ul>
    </div>
    <h2>Buttons</h2>
    <ul>
      <li>
        <NuxtLink to="/forms/examples/buttons">Buttons</NuxtLink>
      </li>
    </ul>

    <div>
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
</style>
