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
          <NuxtLink to="/forms/examples/material/checkbox-radio-panels" class="link-normal">
            Checkbox/Radio panels
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/forms/examples/buttons" class="link-normal">Buttons</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/components/utils/color-mode" class="link-normal">Colour mode</NuxtLink>
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
    class: "body-default",
    id: "body",
  },
})

// const { currentColourScheme } = useColourScheme();
// useColourScheme();

// onBeforeMount(() => {
//   currentColourScheme;
// });
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
