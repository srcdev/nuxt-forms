<template>
  <div class="page-layout">
    <div>
      <h1><NuxtLink to="/">Home</NuxtLink></h1>
      <ul class="flex-group">
        <li>
          <NuxtLink to="/typography" class="link-normal">Typography</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/forms/examples/material/text-fields" class="link-normal">Material UI text fields</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/forms/examples/buttons" class="link-normal">Buttons</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="page-layout-content">
      <slot name="layout-content"></slot>
    </div>

    <NavFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'body-default',
    id: 'body',
  },
  // link: [
  //   {
  //     rel: 'preconnect',
  //     href: 'https://fonts.googleapis.com',
  //   },
  //   {
  //     rel: 'preconnect',
  //     href: 'https://fonts.gstatic.com',
  //     crossorigin: 'use-credentials',
  //   },
  //   {
  //     href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  //     rel: 'stylesheet',
  //   },
  // ],
});
</script>

<style lang="css">
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0 2rem;
}

.page-layout-content {
  container: content / inline-size;
}

.flex-group {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
}

ul.flex-group {
  list-style-type: none;
  padding: 0;
}
</style>
