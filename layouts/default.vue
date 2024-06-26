<template>
  <div class="page-layout">
    <div>
      <h1>Header</h1>
    </div>

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
})
</script>

<style lang="css">
.page-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
